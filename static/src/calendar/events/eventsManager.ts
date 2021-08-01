import type { Calendar, Event, Events } from './types'
import SecureStorage from '../../plugins/secureStorage'

class EventsManager {
  calendar: Calendar | any = {}
  private observers: Set<Function> = new Set()
  
  constructor() {
    this.calendar = {}
  }

  private _extractDate(date: Date): [number, number, number] {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    return [ year, month, day ]
  }

  addUpdateListener(cb: Function) {
    this.observers.add(cb)
  }

  removeUpdateListener(cb: Function) {
    this.observers.delete(cb)
  }

  onError(err) {
    console.error(err.toString(), { ...err }, JSON.stringify({ ...err }))
  }

  hasEvents(date: Date): Events {
    const [ year, month, day] = this._extractDate(date)
    return this.calendar?.[year]?.[month]?.[day]
  }

  getEvents(date: Date): Events {
    let events = {}
    
    if (!(events = this.hasEvents(date))) { 
      return {}
    }

    return events
  }

  createEvent(date: Date, event: Event, eventId?: string) {
    const [ year, month, day] = this._extractDate(date)

    if (!this.calendar?.[year]) {
      this.calendar[year] = {}
    }

    if (!this.calendar[year]?.[month]) {
      this.calendar[year][month] = {}
    }

    if (!this.calendar[year][month]?.[day]) {
      this.calendar[year][month][day] = {}
    }

    const id = eventId ? eventId : (Math.random() + '').substring(2)
    this.calendar[year][month][day][id] = event

    this._saveEvents()
  }

  deleteEvent(date: Date, eventId: string) {
    const events = this.getEvents(date)
    delete events[eventId]
    this._saveEvents()
  }

  private async _saveEvents() {
    // ClientStorage.set('__calendar', this.calendar)
    await SecureStorage.saveContent(this.calendar).catch(this.onError)
  }

  async loadEvents() {
    const setup = await SecureStorage.setup().catch(this.onError)

    if (!setup) {
      return {}
    }

    this.calendar = await SecureStorage.getContent().catch(this.onError)

    this.observers.forEach(cb => cb())
  }
}

export default new EventsManager()
export type Event = {
  date: Date
  title: string
  color: string
  description: string
  time: string
}

export type Events = {
  [id: string]: Event
}

export interface Calendar {
  [year: number]: {
    [month: number]: {
      [day: number]: Events
    }
  }
}

export type AddEditEventActionType = 'add' | 'edit'
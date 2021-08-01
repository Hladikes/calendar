<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import EventsManager from './eventsManager'
  import EventColorPicker from './EventColorPicker.svelte'
  import TimePicker from '../../plugins/TimePicker.svelte'
  import type { Event } from './types'

  export let date: Date
  export let eventId: string
  export let eventData: Event

  const dispatch = createEventDispatcher()
  
  let title: string = eventData.title
  let color: string = eventData.color
  let time: string = eventData.time
  let description: string = eventData.description

  $: canSubmit = (
    !!title.replaceAll(' ', '') && !!color
  )

  function onEventSubmit() {
    EventsManager.createEvent(date, {
      date, title, color, description, time
    }, eventId)

    dispatch('update')
  }

  function onEventDelete() {
    EventsManager.deleteEvent(date, eventId)
    dispatch('update')
  }
</script>

<div class="flex flex-col flex-1 space-y-4">
  <div class="flex flex-col space-y-3 flex-1">
    <div class="flex flex-row items-center">
      <div 
        style={ 'background-color: ' + color } 
        class="w-6 h-6 rounded-full ml-2 mr-4 border border-cool-gray-300 dark:border-cool-gray-800"></div>

      <input 
        placeholder="Title" 
        class="input flex-1" 
        type="text" 
        bind:value={ title }>
    </div>

    <div class="flex flex-row items-center justify-between">
      <span class="font-medium ml-1">Event start</span>
      <TimePicker bind:time={ time } />
    </div>

    <EventColorPicker bind:color={color} />
  </div>
  
  <div class="flex flex-row space-x-4">
    <button 
      on:click={ onEventDelete }
      class="btn btn-flat btn-icon !border-red-500 !text-red-500 bg-red-500 bg-opacity-10">
      <i class="material-icons-round">delete</i>Delete
    </button>
    
    <button 
      disabled={!canSubmit}
      class="btn btn-flat btn-icon flex-1" 
      on:click={ onEventSubmit }>Save</button>
  </div>
</div>
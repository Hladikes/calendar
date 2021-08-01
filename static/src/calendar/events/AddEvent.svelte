<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import EventsManager from './eventsManager'
  import EventColorPicker from './EventColorPicker.svelte'
  import TimePicker from '../../plugins/TimePicker.svelte'

  export let date: Date

  const dispatch = createEventDispatcher()
  
  let title: string = ''
  let color: string = ''
  let time: string = '01:00'
  let description: string = ''

  $: canSubmit = (
    !!title.replaceAll(' ', '') && !!color
  )

  function onEventSubmit() {
    EventsManager.createEvent(date, {
      date, title, color, description, time
    })

    dispatch('update')
  }
</script>

<div class="flex flex-col flex-1 space-y-4">
  <div class="flex flex-col space-y-3 flex-1">
    <div class="flex flex-row items-center">
      <div 
        class:border={ !color }
        style={ 'background-color: ' + color } 
        class="w-6 h-6 rounded-full ml-2 mr-4 border-cool-gray-300 dark:border-cool-gray-800"></div>

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
  
  <button 
    disabled={!canSubmit}
    class="btn btn-flat btn-icon" 
    on:click={ onEventSubmit }>
    <i class="material-icons-round">add</i>Add event
  </button>
</div>
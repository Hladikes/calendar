<script lang="ts">
  import { onMount } from 'svelte';
  import AddEvent from './AddEvent.svelte'
  import EditEvent from './EditEvent.svelte'
  import Popup from '../../plugins/Popup.svelte';
  import EventsManager from './eventsManager'
  import type { Events, Event } from './types'
  
  export let date: Date

  let isAddEventPopupVisible: boolean = false
  let events: Events
  
  let isEditEventPopupVisible: boolean = false
  let selectedEventId: string
  let selectedEventData: Event

  onMount(() => {
    if (EventsManager.hasEvents(date)) {
      getEvents()
    }
  })

  $: hasEvents = events ? (Object.keys(events).length !== 0) : false

  function getEvents() {
    events = EventsManager.getEvents(date)
  }

  function updateEvents() {
    isAddEventPopupVisible = false
    isEditEventPopupVisible = false
    getEvents()
  }

  function onEventClick(eventId: string, eventData: Event) {
    selectedEventId = eventId
    selectedEventData = eventData
    isEditEventPopupVisible = true
  }
  
  function getRandomEmoji() {
    const arr = [ 
      '🌴', '⭐' ,'🎉', '🎈', 
      '🎊', '🎡', '🎨', '🎆', 
      '🎲', '🎮', '🎧', '🗿', 
      '📺', '📸', '💡'
    ]
    return arr[Math.floor(Math.random() * arr.length)]
  }
</script>

{#if hasEvents}
  <div class="flex-1 self-stretch overflow-y-auto">
    {#each Object.entries(events) as [id, event]}
      <button 
        class="flex flex-row w-full space-x-4 border-b border-cool-gray-500 border-opacity-20" 
        on:click={ () => onEventClick(id, event) }>

        <div 
          class="mt-4 w-5 h-5 rounded-full"
          style={ 'background-color:' + event.color }></div>

        <span class="text-xl py-3 select-none break-all flex-1 text-left">{event.title}</span>
        <span class="mt-4 font-mono text-blue-500 dark:text-blue-600 font-medium">{ event.time }</span>
      </button>
    {/each}
  </div>
{:else}
  <p class="font-light text-4xl select-none mb-10 mt-10 md:mt-0">{getRandomEmoji()} No events</p>
{/if}

<button 
  class="btn btn-flat btn-icon mt-5" 
  on:click={ () => isAddEventPopupVisible = true }>
  <i class="material-icons-round">add</i>Add Event
</button>

<Popup title="Add event" bind:visible={ isAddEventPopupVisible } size="small" on:dismiss={ updateEvents }>
  <AddEvent 
    {date} 
    on:update={ updateEvents } />
</Popup>

<Popup title="Edit event" bind:visible={ isEditEventPopupVisible } size="small" on:dismiss={ updateEvents }>
  <EditEvent
    {date} 
    eventId={ selectedEventId }
    eventData={ selectedEventData } 
    on:update={ updateEvents } />
</Popup>
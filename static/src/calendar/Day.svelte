<script lang="ts">
  import { 
    getCurrentDate, 
    getCurrentMonth, 
    getCurrentYear, 
    getDayName, 
    correctDayIndex 
  } from './date.util'
  import EventsManager from './events/eventsManager'
  import Popup from '../plugins/Popup.svelte'
  import DayDetail from './DayDetail.svelte'
  import { onDestroy, onMount } from 'svelte';
  
  export let date: Date

  const currentDate = date.getDate()
  const currentDay = date.getDay()
  const isToday = (
    getCurrentYear() === date.getFullYear() &&
    getCurrentMonth() === date.getMonth() &&
    getCurrentDate() === date.getDate()
  )
  
  let isDayDetailVisible: boolean = false
  let events = EventsManager.getEvents(date)
  
  $: eventDots = Object.values(events).map(event => event.color)

  const getDetailTitle = (date) => (
    `${date.getDate()}.${date.getMonth() + 1}. ${getDayName(correctDayIndex(date.getDay()))}`
  )
  const getEvents = () => events = EventsManager.getEvents(date)
  const onDayClick = () => isDayDetailVisible = true
  const onDayDetailDismiss = () => {
    isDayDetailVisible = false
    getEvents()
  }
  
  onMount(() => EventsManager.addUpdateListener(getEvents))
  onDestroy(() => EventsManager.removeUpdateListener(getEvents))
</script>

<div 
  class="relative bg-white dark:bg-black bg-opacity-90 hover:bg-opacity-100 cursor-pointer group active:bg-opacity-20 transition flex" 
  on:click={ onDayClick }>
  
  <div class="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-start md:justify-end">
    <span 
      class:today={ isToday }
      class:weekend={ currentDay === 0 || currentDay === 6 }
      class="day-label">{currentDate}</span>
  </div>

  <div class="flex flex-row flex-wrap self-end gap-1 m-1 md:m-2">
    {#each eventDots as color (Math.random())}
      <div
        style={ 'background-color:' + color } 
        class="h-3 w-3 rounded-full"></div>
    {/each}
  </div>
</div>

<Popup title={getDetailTitle(date)} bind:visible={isDayDetailVisible} size='medium' on:dismiss={ onDayDetailDismiss }>
  <DayDetail {date} />
</Popup>

<style lang="postcss">

  .day-label {
    @apply 
      text-xl 
      md:text-2xl 
      w-9 md:w-10 
      h-9 md:h-10 
      flex items-center justify-center 
      mt-2 md:m-2 
      text-black
      dark:text-cool-gray-400 
      group-hover:text-blue-600 
      group-hover:!text-opacity-100 
      transition 
      select-none;
  }

  .weekend {
    @apply text-opacity-50;
  }

  .today {
    @apply bg-blue-500 text-white rounded-full group-hover:text-white;
  }

</style>
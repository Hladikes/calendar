<script lang="ts">
  import { correctDayIndex, getDayName } from './date.util';
  import { createEventDispatcher } from 'svelte'
  import EventsList from './events/EventsList.svelte'
  
  const dispatch = createEventDispatcher()

  export let date: Date

  $: currentDate = date.getDate()
  $: currentMonth = date.getMonth() + 1
  $: currentDayName = getDayName(correctDayIndex(date.getDay()))

  function update() {
    dispatch('update')
  }
</script>

<div class="flex-1 flex flex-col justify-center items-center overflow-hidden">
  <EventsList {date} />
</div>
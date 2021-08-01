<script lang="ts">
  import { 
    generateCalendar, 
    getCurrentYear, 
    getCurrentMonth ,
    getDayNames,
    getMonthName
  } from './date.util'
  
  import Day from './Day.svelte'
  import Options from './events/Options.svelte'
  import Popup from '../plugins/Popup.svelte'

  let selectedYear = getCurrentYear()
  let selectedMonth = getCurrentMonth()
  let isSettingsPopupVisible: boolean = false
  let shouldBeBottomBarVisible: boolean = 
    !getComputedStyle(document.documentElement)
      .getPropertyValue("--sab")
      .includes('0px')

  $: calendar = generateCalendar(selectedYear, selectedMonth)

  function nextMonth() {
    if (selectedMonth === 11) {
      selectedMonth = 0
      selectedYear++
    } else {
      selectedMonth++
    }
  }

  function previousMonth() {
    if (selectedMonth === 0) {
      selectedMonth = 11
      selectedYear--
    } else {
      selectedMonth--
    }
  }

</script>

<div class="flex flex-col flex-1">
  <div class="p-3 flex space-x-3 bg-white dark:bg-cool-gray-950">
    <button class="btn btn-flat btn-icon" on:click={ previousMonth }>
      <i class="material-icons-round">keyboard_arrow_left</i>
    </button>

    <button 
      on:click={ () => isSettingsPopupVisible = true }
      class="btn btn-flat flex-1 md:w-60 md:flex-none relative">
      <span>{selectedYear} {getMonthName(selectedMonth)}</span>
      <div class="flex absolute right-2 top-0 bottom-0 items-center">
        <i class="material-icons-round">more_vert</i>
      </div>
    </button>
    
    <button class="btn btn-flat btn-icon" on:click={ nextMonth }>
      <i class="material-icons-round">keyboard_arrow_right</i>
    </button>
  </div>
  
  <div class="flex-1 flex bg-gray-200 dark:bg-cool-gray-950 border-t dark:border-cool-gray-950">
    <div class="calendar-grid">
      {#each getDayNames() as day}
        <div class="font-medium select-none text-center bg-white dark:bg-black dark:text-cool-gray-600 py-3">{day.substr(0, 2).toUpperCase()}</div>
      {/each}

      {#each calendar as week}
        {#each week as day (Math.random())}
          {#if day}
            <Day date={day} />
          {:else}
            <div></div>
          {/if}
        {/each}  
      {/each}
    </div>
  </div>

  {#if shouldBeBottomBarVisible}
    <div class="h-8 md:hidden border-t dark:border-cool-gray-950"></div>
  {/if}
</div>

<Popup title="Options" bind:visible={ isSettingsPopupVisible } size='small'>
  <Options on:dismiss={ () => isSettingsPopupVisible = false } />
</Popup>

<style lang="postcss">

  .calendar-grid {
    flex: 1;
    display: grid;
    grid-gap: 1px;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: max-content;
  }

</style>
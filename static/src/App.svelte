<script lang="ts">
  import './styles.css'
  import './assets/icons/import.css'
  import { fade } from 'svelte/transition'
  import Calendar from './calendar/Calendar.svelte'
  import EventsManager from './calendar/events/eventsManager'
  import { onMount } from 'svelte'

  let eventsLoaded: boolean = false

  const delay = (ms) => new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })

  onMount(async () => {
    await EventsManager.loadEvents()
    await delay(1000)
    eventsLoaded = true
  })
</script>

<main class="w-screen h-screen fixed flex dark:text-cool-gray-300 ">
  {#if eventsLoaded}
    <Calendar />
  {:else}
    <div transition:fade class="w-screen h-screen z-50 absolute flex justify-center items-center">
      <h1 class="font-light text-blue-500 select-none">
        <i class="material-icons-round !text-9xl">event</i>
      </h1>
    </div>
  {/if}
</main>
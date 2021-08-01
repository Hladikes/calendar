<script lang="ts">
  import { fly, fade } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'
  
  const dispatch = createEventDispatcher()

  export let index: number = 10
  export let visible: boolean = false
  export let title: string = ''

  type size = 'small' | 'medium' | 'big' | 'auto'
  export let size: size

  let duration: number = 300

  function onClickAway() {
    visible = false
    dispatch('dismiss')
  }
</script>

{#if visible}
  <div 
    style={ 'z-index: ' + index }
    class="fixed top-0 left-0 right-0 bottom-0 pointer-events-all bg-black bg-opacity-50" 
    on:click={ onClickAway } 
    transition:fade={{ duration }}></div>

  <div class="fixed z-30 top-0 left-0 right-0 bottom-0 flex md:items-center items-end justify-center pointer-events-none">
    <div 
      class:size-small={ size === 'small' }
      class:size-medium={ size === 'medium' }
      class:size-big={ size === 'big' }
      class="flex-1 md:flex-none relative bg-white dark:bg-cool-gray-900 rounded-tl-xl rounded-tr-xl md:rounded-xl p-8 pb-10 shadow-2xl pointer-events-auto flex flex-col" 
      transition:fly={{ y: 100, duration }}>

      {#if title}
        <h1 class="text-3xl md:text-4xl font-light mb-5 select-none">{ title }</h1>
      {/if}

      <slot></slot>

      <button 
        on:click={ onClickAway }
        class="visible md:hidden text-cool-gray-500 absolute top-4 right-4">
        <i class="material-icons-round !text-3xl">close</i>
      </button>
    </div>
  </div>
{/if}

<style lang="postcss">
  .size-small {
    @apply w-5/12 md:w-6/12 lg:w-4/12 h-auto md:h-3/6 max-h-full;
  }

  .size-medium {
    @apply w-1/5 md:w-10/12 lg:w-6/12 h-auto md:h-4/6 max-h-full;
  }
  
  .size-big {
    @apply md:w-8/12 h-auto md:h-5/6 max-h-full;
  }
</style>
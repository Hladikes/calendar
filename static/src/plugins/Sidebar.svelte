<script lang="ts">
  import { fade } from 'svelte/transition'
  
  export let index: number = 10
  export let visible: boolean = false

  const duration = 300
</script>

{#if visible} 
  <div 
    style={ 'z-index: ' + index }
    class="fixed top-0 left-0 right-0 bottom-0 pointer-events-all bg-black bg-opacity-50" 
    on:click={ () => visible = false } 
    transition:fade={{ duration }}></div>
{/if}

<div 
  style={ 'z-index: ' + index + 1 }
  class:translate-x-0={ visible } 
  class:-translate-x-full={ !visible } 
  class="transform fixed flex flex-col transition-all duration-300 top-0 bottom-0 w-72 md:w-96 dark:bg-cool-gray-900 p-4">
  <div class="flex flex-row items-center mb-6">
    <h1 class="text-3xl md:text-4xl flex-1 ml-2 font-light select-none">Menu</h1>

    <button 
      on:click={ () => visible = false }
      class="visible md:hidden text-cool-gray-500 absolute top-4 right-4">
      <i class="material-icons-round !text-3xl">close</i>
    </button>
  </div>
  <slot></slot>
</div>
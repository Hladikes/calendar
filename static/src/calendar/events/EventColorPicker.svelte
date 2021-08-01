<script lang="ts">
  const colors = {
    'purple': '#673AB7',
    'fuchsia': '#E91E63',
    'red': '#F44336',
    'orange': '#FFC107',
    'teal': '#00BCD4',
    'blue': '#2196F3',
    'green': '#4CAF50',
  }

  export let color: string = colors[0]
</script>

<div class="flex flex-row h-10 space-x-2">
  {#each Object.entries(colors) as [ name, clr ] (clr)}
    <button 
      on:click={ () => color = clr }
      style={ 'background-color: ' + clr }
      class:text-black={ name === 'orange' }
      class:text-white={ name !== 'orange' }
      class="flex-1 rounded-lg font-bold">
      { color === clr ? '✓' : '' }
    </button>
  {/each}
</div>
<script lang="ts">
  export let time = '01:00'
</script>

<span class="input relative flex hover:border-blue-500 !px-4">
  <div class="flex-1 flex items-center absolute top-0 right-0 bottom-0 left-0">
    <span class="ml-3 font-mono">{ time }</span>
  </div>
  <input bind:value={ time } class="opacity-0 flex-1" type="time">
  <div class="absolute right-3 top-0 bottom-0 flex items-center pointer-events-none">
    <i class="material-icons-round">watch_later</i>
  </div>
</span>

<style lang="postcss">
  input[type="time"]::-webkit-calendar-picker-indicator {
    position: absolute;
    width: 100%;
  }
</style>
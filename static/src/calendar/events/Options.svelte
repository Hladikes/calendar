<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Popup from '../../plugins/Popup.svelte'
  import SecretsManager from './SecretsManager.svelte'
  import EventsManager from './eventsManager'
  
  const dispatch = createEventDispatcher()
  let isSecretsPopupVisible

  function loadLatestEvents() {
    EventsManager.loadEvents()
    dispatch('dismiss')
  }

  function clearStorage() {
    localStorage.clear()
    location.reload()
  }

  function reload() {
    location.reload()
  }

  function manageSecrets() {
    isSecretsPopupVisible = true
  }
</script>

<div class="flex-1 flex flex-col space-y-3">
  <button on:click={ loadLatestEvents } class="btn btn-flat btn-icon">
    <i class="material-icons-round">cloud_download</i>Load latest events
  </button>
  
  <button on:click={ reload } class="btn btn-flat btn-icon">
    <i class="material-icons-round">refresh</i>Reload
  </button>
  
  <button on:click={ manageSecrets } class="btn btn-flat btn-icon">
    <i class="material-icons-round">security</i>Manage secrets
  </button>

  <button on:click={ clearStorage } class="btn btn-flat btn-icon">
    <i class="material-icons-round">delete</i>Clear storage
  </button>
</div>

<Popup bind:visible={ isSecretsPopupVisible } size="small" title="Secrets">
  <SecretsManager />
</Popup>
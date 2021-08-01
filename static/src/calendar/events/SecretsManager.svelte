<script lang="ts">
  import SecureStorage from '../../plugins/secureStorage'
  
  let { clientId, privateKey } = SecureStorage.getKeys()

  const saveAndReload = () => {
    SecureStorage.setClientId(clientId)
    SecureStorage.setPrivateKey(privateKey)
    location.reload()
  }

  // https://stackoverflow.com/a/46215202/4396543
  const copy = (text) => {
    let input = document.createElement('textarea')
    input.innerHTML = text
    document.body.appendChild(input)
    input.select()
    let result = document.execCommand('copy')
    document.body.removeChild(input)
    return result
  }
</script>

<div class="flex flex-col space-y-5">
  <div class="flex flex-col space-y-2">
    <p>Client ID</p>
    <div class="flex flex-row space-x-2">
      <button class="btn btn-flat btn-icon !px-2" on:click={ () => copy(clientId) }>
        <i class="material-icons-round">copy</i>
      </button>
      <input type="text" class="input flex-1" bind:value={ clientId }>
    </div>
  </div>
  
  <div class="flex flex-col space-y-2">
    <p>Private key</p>
    <div class="flex flex-row space-x-2">
      <button class="btn btn-flat btn-icon !px-2" on:click={ () => copy(privateKey) }>
        <i class="material-icons-round">copy</i>
      </button>
      <input type="password" class="input flex-1" bind:value={ privateKey }>
    </div>
  </div>

  <button class="btn btn-flat" on:click={ saveAndReload }>Save & Reload</button>
</div>
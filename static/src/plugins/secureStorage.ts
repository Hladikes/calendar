import axios from 'axios'
axios.defaults.baseURL = 
  (process.env.NODE_ENV === 'development') 
    ? `${location.protocol}//${location.hostname}:8080`
    : ''

import ClientStorage from './clientStorage'
import CryptoJS from 'crypto-js'

class SecureStorage {

  private _clientId: string
  private _privateKey: string
  private _localStorageKey: string = '__keys'

  async setup() {
    console.log('SecureStorage is setting up ...')

    let keys = null
    if (!(keys = ClientStorage.get(this._localStorageKey))) {
      const { data } = await axios.post('/register')
      this._clientId = data.clientId
      this._privateKey = this._createUUID()
      this._saveKeys()
    } else {
      this._clientId = keys.clientId
      this._privateKey = keys.privateKey
    }

    console.log('SecureStorage was successfuly loaded')
    return true
  }

  private _encrypt(content: string, key: string): string {
    const encrypted = CryptoJS.AES.encrypt(content, this._privateKey)
    return encrypted.toString()
  }

  private _decrypt(content: string, key: string): string {
    const decrypted = CryptoJS.AES.decrypt(content, key)
    return decrypted.toString(CryptoJS.enc.Utf8)
  }

  getKeys() {
    return {
      clientId: this._clientId,
      privateKey: this._privateKey
    }
  }

  setClientId(clientId: string) {
    this._clientId = clientId
    this._saveKeys()
  }

  setPrivateKey(privateKey: string) {
    this._privateKey = privateKey
    this._saveKeys()
  }

  async saveContent(content) {
    const contentType = content.constructor.name

    if (contentType === 'Object' || contentType === 'Array') {
      content = JSON.stringify(content)
    }

    const contentToSave = {
      type: contentType,
      content
    }

    const encryptedContent = this._encrypt(JSON.stringify(contentToSave), this._privateKey)

    await axios.post(`/${this._clientId}`, {
      content: encryptedContent
    })
  }

  async getContent() {
    const { data } = await axios.get(`/${this._clientId}`)
    const decrypted = this._decrypt(data.content, this._privateKey)

    if (!decrypted) {
      return {}
    }

    const { content, type } = JSON.parse(decrypted)

    if (type === 'Object' || type === 'Array') {
      return JSON.parse(content)
    }

    return content
  }

  // https://gist.github.com/ifandelse/3031112
  private _createUUID() {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'
    return s.join('')
  }

  private _saveKeys() {
    ClientStorage.set(this._localStorageKey, {
      clientId: this._clientId,
      privateKey: this._privateKey
    })
  }

}

export default new SecureStorage()
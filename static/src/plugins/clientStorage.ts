class ClientStorage {

  get(key: string) {
    if (localStorage.getItem(key)) {
      const item = localStorage.getItem(key)
      const deserialized = JSON.parse(item)
      let content = deserialized.value

      if (deserialized.type === 'Object' || deserialized.type === 'Array') {
        content = JSON.parse(deserialized.value)
      }

      return content
    } 
    
    return null
  }

  set(key: string, value: any) {
    const type = value.constructor.name
    
    if (type === 'Object' || type === 'Array') {
      value = JSON.stringify(value)
    }

    localStorage.setItem(key, JSON.stringify({
      type,
      value
    }))
  }

}

export default new ClientStorage()
const express = require('express')
const fs = require('fs')
const uuid = require('uuid')
const cors = require('cors')
const app = express()
const PORT = 8080

app.use(cors())
app.use(express.json())
app.use(express.static('static/dist'))

setInterval(() => {
  console.log('File removal job begin')
  fs.readdirSync('./calendars').forEach(filename => {
    if (filename === 'ignore') return
    
    const path = `./calendars/${filename}`
    if (!fs.readFileSync(path, { encoding: 'utf-8' })) {
      fs.unlinkSync(path)
      console.log(`File '${path}' removed`)
    }
  })
  console.log('File removal job finished')
}, 1000 * 60 * 60 * 24)

function verifyClientId(clientId) {
  const path = `./calendars/${clientId}.txt`

  if (!fs.existsSync(path)) {
    throw `File '${path}' does not exists`
  }

  return { path, clientId }
}

app.post('/register', (req, res) => {
  try {
    const id = uuid.v4()
    fs.writeFileSync(`./calendars/${id}.txt`, '', { encoding: 'utf-8' })
    return res.status(200).send({ clientId: id })
  } catch (err) {
    console.error(err)
    return res.status(500).end()
  }
})

app.get('/:clientId', (req, res) => {
  try {
    const { path } = verifyClientId(req.params.clientId)
    const content = fs.readFileSync(path, { encoding: 'utf-8' })
    return res.status(200).send({ content })
  } catch (err) {
    console.error(err)
    return res.status(500).end()
  }
})

app.post('/:clientId', (req, res) => {
  try {
    const { path } = verifyClientId(req.params.clientId)
    const content = req.body.content
    fs.writeFileSync(path, content, { encoding: 'utf-8' })
    return res.status(200).end()
  } catch (err) {
    console.error(err)
    return res.status(500).end()
  }
})

app.listen(PORT, () => console.log(`Server is running at :${PORT}`))
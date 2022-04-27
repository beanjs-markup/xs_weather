const { loadNuxt, build } = require('nuxt')

const fs = require('fs')
const { default: axios } = require('axios')
const app = require('express')()
const upload = require('multer')({ dest: 'uploads/' })
const cors = require('cors')
const xlsx = require('node-xlsx')

const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 8000

async function start () {
  // We get Nuxt instance
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

  app.use(cors())

  app.post('/upload', upload.any(), async function (req, res) {
    const sheets = xlsx.parse(
      fs.readFileSync(`${__dirname}/${req.files[0].path}`)
    )

    const sheet1 = sheets[0]
    const sheet2 = { name: 'sheet1', data: [] }

    for (const v of sheet1.data) {
      const nv = [...v]
      if (v.length < 3) {
        const zoneCode = v[0]
        const { data } = await axios.get(
          `http://www.weather.com.cn/data/sk/${zoneCode}.html`
        )
        nv.push(data.weatherinfo.temp)
      }
      sheet2.data.push(nv)
    }

    fs.writeFileSync(`${__dirname}/output.xlsx`, xlsx.build([sheet2]))
    res.send('upload ok')
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })

  app.get('/download', function (req, res) {
    const file = `${__dirname}/output.xlsx`
    if (!fs.existsSync(file)) {
      res.send('not upload')
    } else {
      res.download(file, 'output.xlsx')
    }
  })

  // Render every route with Nuxt
  app.use(nuxt.render)

  // Build only in dev mode with hot-reloading
  if (isDev) {
    build(nuxt)
  }
  // Listen the server
  app.listen(port, '0.0.0.0')
  console.log('Server listening on `localhost:' + port + '`.')
}

start()

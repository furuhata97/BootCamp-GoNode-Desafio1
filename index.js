// para iniciar um novo projeto use o comando yarn init -y

// express é um mini-framework para lidar com rotas e views
// instala com yarn add express
const express = require('express')

// para incluir variáveis utiliza-se o apóstrofo `
// para colocar uma variável na url utiliza-se :nomeDaVar
// um parâmetro pode ser delcarado com req.params.var ex: /name/Gustavo
// query param podem ser declaradas com req.query.var ex: /?name=Gustavo

// nunjucks serve para utilizar html em javascript
// instala com yarn add nunjucks
const nunjucks = require('nunjucks')

const app = express()

// primeiro parâmetro é o nome da pasta onde estarão as views
// segundo parâmetro é um objetos com autoscape, express com
// o nome da variável que contém o servidor express, e watch
// para atualizar ao salvar
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

// serve para o express saber lidar com informações provenientes
// de um form html
app.use(express.urlencoded({ extended: false }))

// serve para setar configurações globais
// view engine é a extensão que será utilizada para os arquivos do nunjucks
// njk é o nome da extensão
app.set('view engine', 'njk')

// middleware que verifica se a idade foi passada como query params
const checkAge = (req, res, next) => {
  const age = req.query.age
  if (!age) {
    console.log('Sem idade')
    return res.redirect('/')
  } else {
    return next()
  }
}

// rota inicial com um form de idade
app.get('/', (req, res) => {
  return res.render('age')
})

// rota que verifica a idade
app.post('/check', (req, res) => {
  const age = req.body.idade
  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

// rota maior de idade
app.get('/major', checkAge, (req, res) => {
  const age = req.query.age
  return res.render('major', { age })
})

// rota menor de idade
app.get('/minor', checkAge, (req, res) => {
  const age = req.query.age
  return res.render('minor', { age })
})

// app escuta a porta 3000
app.listen(3000)

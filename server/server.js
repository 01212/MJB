const Express = require('express');
const BodyParser = require('body-parser');
const FormDataParser = require('express-form-data');
const parseImage = require('./parsingMiddleware');
const config = require('./githubConfig');
const buildQuery = require ('./buildQuery.js');
const writeDB = require ('./writeDB.js');
const PORT = 3000;

const App = Express();

const githubOAuth = require('github-oauth')({
    githubClient: config.GITHUB_KEY,
    githubSecret: config.GITHUB_SECRET,
    baseURL: 'http://localhost:' + PORT,
    loginURI: '/auth',
    callbackURI: '/callback'
  })

App.use(BodyParser.urlencoded({ extended: false}));

App.use(FormDataParser.parse());

App.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*'
    });
    next();
})

App.get('/auth', function(req, res){
    console.log("started oauth");
    return githubOAuth.login(req, res);
});


  App.get("/callback", function(req, res){
    console.log("received callback");
    return githubOAuth.callback(req, res);
  });

  githubOAuth.on('error', function(err) {
    console.error('there was a login error', err)
  })
  
  githubOAuth.on('token', function(token, serverResponse) {
    res.json(JSON.stringify(token))
  })

// App.get('/', (req, res) => {
//     console.log('get request');
//     res.end('OK');
// })
// App.get('/auth', (req,res) => {                
//     res.send('hi')
//     })

App.post('/', parseImage.runTesseract, buildQuery.tbSyn, writeDB.writeDB);

App.listen(PORT);
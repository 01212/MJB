const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const FormDataParser = require('express-form-data');
const parseImage = require('./parsingMiddleware')
const buildQuery = require ('./buildQuery.js');
const writeDB = require ('./writeDB.js');
const PORT = 3000;
const path = require('path')
const cookieParser = require('cookie-parser')


//github 
const GitHubStrategy = require('passport-github').Strategy;
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors')


App.use(cors());
App.use(BodyParser.urlencoded({ extended: false}));
App.use(FormDataParser.parse());
App.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Status-Code': '200'
    });
    next();
});


 


//cookie session config
App.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: ['randomstringhere']
}));

App.use(cookieParser());
App.use(passport.initialize()); // Used to initialize passport
App.use(passport.session()); // Used to persist login sessions

passport.use(new GitHubStrategy({
    clientID: '61fd9f1b3086d11c4877',
    clientSecret: '7bb3fd8ac48f30cbb9c53b9f3aac848594c31979',
    callbackURL: 'http://localhost:3000/api/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    return cb(null,profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

function isUserAuthenticated(req, res, next) {
    if (req.user) {
        console.log('user confirmed')
        next();
    } else {
        res.send('You must login!');
    }
}

App.get('/api/auth/github', passport.authenticate('github', {
    scope: ['profile'] // Used to specify the required data
}));

App.get('/api/callback', passport.authenticate('github'), (req, res) => {
    console.log('going to secret')
    res.setC
    res.redirect('http://localhost:8080/upload');
});

App.get('/secret', isUserAuthenticated, (req, res) => {
    console.log('got to secret')
    res.send('secret')
});

App.get('/api/logout', (req, res) => {
    req.logout(); 
    res.redirect('/api');
});

App.get('/api/testing',((req,res) => {
    res.json({success: true})
}))


App.get('/upload',((req,res) => {
    res.sendFile(path.join(__dirname,'../index.html'))
}))


App.post('/', parseImage.runTesseract, buildQuery.tbSyn, writeDB.writeDB);

App.listen(PORT);
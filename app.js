/** @format */
const express = require('express');
const app = express();
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const passportSetup = require('./config/passport-setup.js');
connectDB();

app.set('view engine', 'ejs');

//bring body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('node_modules'));

//Session and Flash Config
app.use(
	session({
		secret: 'lorem ipsum',
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 60000 * 15 },
	})
);
app.use(flash());
//bring passport
app.use(passport.initialize());
app.use(passport.session());

//store user object

app.use((req, res, next) => {
	res.locals.user = req.user || null;
	next();
});

app.get('/', (req, res) => {
	res.redirect('/events');
});

//bring events routes
const events = require('./routes/event-routes');
app.use('/events', events);

//bring user routes
const users = require('./routes/user-routes');
app.use('/users', users);

//listen to port 3000
app.listen(3000, () => {
	console.log('Listning From Port 3000');
});

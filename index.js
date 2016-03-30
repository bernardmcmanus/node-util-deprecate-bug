'use strict';

const
	path = require('path'),
	express = require('express'),
	http = require('http');

const
	PORT = 9005;

const
	app = express(),
	server = http.createServer(app);

app.set('view options', {layout: false});
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
	res.render('index', {title: 'My Page'});
});

app.use((req, res, next) => {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: err
	});
});

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});

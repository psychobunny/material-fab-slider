"use strict";

var express = require('express'),
	app = express();

app.use(express.static('public', {
	maxAge: 0
}));

var server = app.listen(3000, function() {
	console.log('Ready.');
});
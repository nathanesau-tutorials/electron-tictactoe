console.log('renderer process 1');

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path')
const url = require('url')

const newWindowBtn = document.getElementById('newWindowBtn');
newWindowBtn.addEventListener('click', function (event) {
	// #NE - handler logic goes here (need to bind to click screen not button)
});


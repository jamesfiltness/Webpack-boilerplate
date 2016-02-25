import React from 'react'
import { render } from 'react-dom'
import App from './components/App.jsx'


function main() {
	const rootEl = document.createElement('div');
	
	document.body.appendChild(rootEl);

	render(
    	<App />, rootEl
  	)
}

main();
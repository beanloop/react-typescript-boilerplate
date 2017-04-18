import * as React from 'react'
import {render} from 'react-dom'
import {App} from './app'

// Make React global so that components can use JSX without importing React
window['React'] = React

function renderApp(App) {
  const app = document.getElementById('app')
  if (module.hot) {
    const RedBox = require('redbox-react')
    try {
      render(<App />, app)
    } catch (error) {
      render(<RedBox error={error} />, app)
    }
  } else {
    render(<App />, app)
  }
}

if (window.document) {
  renderApp(App)
}

if (module.hot) {
  module.hot.accept('./app', () => {
    const UpdatedApp = require('./app').App
    setTimeout(() => renderApp(UpdatedApp))
  })
}

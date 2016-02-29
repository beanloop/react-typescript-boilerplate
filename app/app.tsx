import * as React from 'react'
import {Router, Route} from 'react-router'

const Container = ({children}) => <main>{children}</main>

export function routes() {
  return (
    <Route path='/' component={Container}>
    </Route>
  )
}

export const App = () => <Router>{routes()}</Router>

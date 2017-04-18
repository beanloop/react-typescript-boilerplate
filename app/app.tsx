import {IndexRedirect, Router, Route} from 'react-router'

const Container = ({children}) => <main>{children}</main>
export const Hello = () => <span>Hello, world!</span>

export function routes() {
  return (
    <Route path='/' component={Container}>
      <IndexRedirect to='/hello' />
      <Route path='/hello' component={Hello} />
    </Route>
  )
}

export const App = () => <Router>{routes()}</Router>

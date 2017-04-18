import {BrowserRouter, Link} from 'react-router-dom'
import Route from 'react-router/Route'
import Switch from 'react-router/Switch'

export const Home = () => <div>Home <Link to="/hello">Go to hello</Link></div>
export const Hello = () => <span>Hello, world!</span>

export const Routes = () =>
  <Switch>
    <Route path="/hello" component={Hello} />
    <Route path="/" render={Home} />
  </Switch>

export const App = () =>
  <BrowserRouter>
    <Main></Main>
  </BrowserRouter>


export const Main = () =>
  <main>
    <Routes />
  </main>

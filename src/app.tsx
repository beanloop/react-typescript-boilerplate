import {IntlProvider} from 'react-intl'
import {BrowserRouter} from 'react-router-dom'
import Route from 'react-router/Route'
import Switch from 'react-router/Switch'
import {Home} from './components/pages/home'
import {Hello} from './components/ui/hello'
import * as sv from './translations/sv.json'

export const Routes = () =>
  <Switch>
    <Route path="/hello" component={Hello} />
    <Route path="/" render={Home} />
  </Switch>

export const App = () =>
  <IntlProvider locale="sv" messages={sv}>
    <BrowserRouter>
      <Main></Main>
    </BrowserRouter>
  </IntlProvider>

export const Main = () =>
  <main>
    <Routes />
  </main>

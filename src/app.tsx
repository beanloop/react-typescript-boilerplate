import {FormattedMessage, IntlProvider, defineMessages} from 'react-intl'
import {BrowserRouter, Link} from 'react-router-dom'
import Route from 'react-router/Route'
import Switch from 'react-router/Switch'
import * as sv from './translations/sv.json'

const messages = defineMessages({
  helloWorld: {
    id: 'app.helloWorld',
    defaultMessage: 'Hej, världen!'
  }
})

export const Home = () => <div>Home <Link to="/hello">Go to hello</Link></div>
export const Hello = () => <FormattedMessage {...messages.helloWorld} />

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

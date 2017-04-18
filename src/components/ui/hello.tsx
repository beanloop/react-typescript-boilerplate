import {FormattedMessage, defineMessages} from 'react-intl'
import {RedTitle} from '../style/headings'

const messages = defineMessages({
  helloWorld: {
    id: 'app.helloWorld',
    defaultMessage: 'Hej, världen!'
  }
})

export const Hello = () =>
  <RedTitle>
    <FormattedMessage {...messages.helloWorld} />
  </RedTitle>

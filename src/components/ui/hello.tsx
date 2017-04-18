import {FormattedMessage, defineMessages} from 'react-intl'

const messages = defineMessages({
  helloWorld: {
    id: 'app.helloWorld',
    defaultMessage: 'Hej, världen!'
  }
})

export const Hello = () => <FormattedMessage {...messages.helloWorld} />

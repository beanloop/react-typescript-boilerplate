import {render} from 'enzyme'
import toJson from 'enzyme-to-json'
import * as React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {Main} from './app'

describe('App', () => {
  global['React'] = React

  it('should render Main', () => {
    const wrapper = render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>,
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})

import { expect } from 'chai'
import { MultiLineRender } from './index.js'
import { shallow } from 'enzyme'

describe('multi line render utility method', function () {
  it('should return a new set of strings in paragraphs represeting new lines', function () {
    const address = '1569 bruckner\napt 7c'
    const renderedText = shallow(MultiLineRender(address))

    expect(renderedText.find('.line_0').text()).to.equal('1569 bruckner')
    expect(renderedText.find('.line_1').text()).to.equal('apt 7c')
  })
})

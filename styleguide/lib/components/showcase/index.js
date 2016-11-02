import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { uniqueId } from 'lodash'
import hljs from 'highlight.js'
import pretty from 'pretty'
import Playground from 'component-playground'

import Card from '../card'

import './codemirror.css'
import './index.css'

class Showcase extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showProps: false,
      showEdit: false,
      showOutput: false
    }
    this.onKeyUp = this.onKeyUp.bind(this)
    this.onChange = this.onChange.bind(this)
    this.id = uniqueId()
  }
  componentDidMount () {
    const previewArea = this.refs.showcase.querySelector('.previewArea')
    const html = previewArea.innerHTML
    const output = this.refs.output
    output.innerHTML = hljs.highlight('html', pretty(html)).value
  }
  onChange (e) {
    this.setState({
      [e.target.value]: e.target.checked
    })
  }
  onKeyUp () {
    this.componentDidMount()
  }
  render () {
    const { id, onKeyUp, onChange, props, state } = this
    const {
      provideRender = false,
      name,
      dependencies,
      showPropsFor,
      edit
    } = props
    const { showProps, showEdit, showOutput } = state
    return (
      <div>

        <h3 className="t7-h3">{name}</h3>

        <div
          ref="showcase"
          className="t7-showcase"
          data-props={showProps}
          data-edit={showEdit}
          data-output={showOutput}
        >
          <div className="t7-showcase-toggle">
            <div>
              <input
                id={`props_${id}`}
                hidden
                checked={showProps}
                onChange={onChange}
                type="checkbox"
                value="showProps"
              />
              <label htmlFor={`props_${id}`}>Props</label>
            </div>
            <div>
              <input
                id={`edit_${id}`}
                hidden
                checked={showEdit}
                onChange={onChange}
                type="checkbox"
                value="showEdit"
              />
              <label htmlFor={`edit_${id}`}>Edit</label>
            </div>
            <div>
              <input
                id={`output_${id}`}
                hidden
                checked={showOutput}
                onChange={onChange}
                type="checkbox"
                value="showOutput"
              />
              <label htmlFor={`output_${id}`}>Output</label>
            </div>
          </div>

          <Card className='t7-card--showcase' onKeyUp={onKeyUp}>
            <Playground
              noRender={!provideRender}
              theme="default"
              docClass={showPropsFor}
              codeText={edit}
              scope={{React, ReactDOM, Component, ...dependencies}}
            />
            <div className="t7-showcase-markup">
              <pre>
                <code className="hljs" ref="output" />
              </pre>
            </div>
          </Card>

        </div>
      </div>
    )
  }
}

Showcase.propTypes = {
  provideRender: PropTypes.bool,
  showPropsFor: PropTypes.any,
  dependencies: PropTypes.any,
  edit: PropTypes.string
}

export default Showcase

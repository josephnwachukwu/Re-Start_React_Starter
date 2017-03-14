import React, { Component } from 'react'

import Username from '../Shared/Fields/Username'
import Password from '../Shared/Fields/Password'
import Email from '../Shared/Fields/Email'
import Address from '../Shared/Fields/Address'
import State from '../Shared/Fields/State'
import ZipCode from '../Shared/Fields/ZipCode'
import Button from '../Shared/Buttons'
import Radio from '../Shared/Fields/Radio'
import Checkbox from '../Shared/Fields/Checkbox'

import './index.css'

export default class Home extends Component {

  render () {
    return (
      <div className='grid'>
        <div className='grid'>
          <div className='grid__col-auto hero'>
            <h1>Re-Start <span>A React Scaffold</span></h1>
            <h2>
              A <strong>Mobile First</strong> responsive library of layouts and components for building outstanding Projects
            </h2>
            <p>Features:</p>
            <ul>
              <li>React Router with Predefined Routes</li>
              <li>Reflex Grid</li>
              <li>Style Guide</li>
              <li>Tested Components</li>
              <li>Full Header and Footer</li>
              <li>Meta and Open Graph Tags</li>
            </ul>
          </div>
        </div>

        <div className='grid'>
          <div className='grid__col-auto'>
            <h2>Style Guide </h2>
            <div className=''>
              <h3>Typography</h3>
              <h4>Headings</h4>
              <h1>Heading 1 <span>Subheading</span></h1>
              <h2>Heading 2 <span>Subheading</span></h2>
              <h3>Heading 3 <span>Subheading</span></h3>
              <h4>Heading 4</h4>
              <h5>Heading</h5>
              <h4>Paragraphs</h4>
              <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
              <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
            </div>
            <div className=''>
              <h3>Buttons</h3>
              <p>
                <Button label='Success' type='success' />
              </p>
              <p>
                <Button label='Cancel' type='neutral' />
              </p>
              <p>
                <Button label='Delete' type='delete' />
              </p>
              <p>
                <Button label='Learn More >' type='proceed' />
              </p>
            </div>
            <div className=''>
              <h3>Forms</h3>
              <form className='form-row-layout'>
                <Username />
                <Password />
                <Email />
                <Address />
                <State />
                <ZipCode />
                <Radio value='Yes' name='Agree' label='Yes' />
                <Radio value='Yes' name='Agree' label='No' />
                <Checkbox value='Left' name='Direction' label='Left' />
                <Checkbox value='Right' name='Direction' label='Right' />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

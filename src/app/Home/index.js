import React, { Component } from 'react'

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
            
            <p>
              Features:
              <ul>
                <li>React Router with Predefined Routes</li>
                <li>Reflex Grid</li>
                <li>Style Guide</li>
                <li>Tested Components</li>
                <li>Full Header and Footer</li>
                <li>Meta and Open Graph Tags</li>
              </ul>
            </p>
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
              <h5>Heading<span></span></h5>
              <h4>Paragraphs</h4>
              <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
              <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
            </div>
            <div className=''>
              <h3>Buttons</h3>
              <p><button type="button" className='btn btn__success'>Submit</button></p>
              <p><button type="button" className='btn btn__neutral'>Cancel</button></p>
              <p><button type="button" className='btn btn__delete'>Delete</button></p>
              <p><button type="button" className='btn btn__proceed'>Learn More > </button></p>
              
            </div>
            <div className=''>
              <h3>Forms</h3>
              <form className='form-row-layout'>
                <div className='form-row'>
                  <label className='form-row__label'>Username</label>
                  <input className='form-row__input' type='text' name='username' />
                </div>
                <div className='form-row'>
                  <label className='form-row__label'>Password</label>
                  <input className='form-row__input' type='password' name='password' />
                </div>
                <div className='form-row'>
                  <label className='form-row__label'>Email</label>
                  <input className='form-row__input' type='email' name='email' placeholder='someone@example.com' />
                </div>
                <div className='form-row'>
                  <label className='form-row__label'>Address</label>
                  <input className='form-row__input' type='text' name='Address' />
                </div>
                <div className='form-row'>
                  <label className='form-row__label'>State</label>
                  <select className='form-row__input'>
                    <option>Select a State</option>
                  </select>
                </div>
                <div className='form-row'>
                  <label className='form-row__label'>Zip</label>
                  <input className='form-row__input' type='text' name='password' />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

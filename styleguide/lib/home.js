import React from 'react'
import { Link } from 'react-router'
import Shell from './components/shell'

import examplePages from '../example_pages'
import router from '../../src/router'
const routes = router.props.children.props.children

export default () => (
  <Shell>
    <br />
    <h2 className="t7-h2">Introduction</h2>
    <p>
      The mWeb Interactive Style Guide includes the resources to create user
      interfaces consistent with the United brand guidelines, design
      principles, and best practices.
    </p>
    <br />
    <h2 className="t7-h2">Demos</h2>
    <ul className="t7-ul">
      {
        examplePages.map(({name, path}, key) => (
          <li key={key}><Link to={`examples/${path}`}>{name}</Link></li>
        ))
      }
    </ul>
    <br />
    <h2 className="t7-h2">Application URLs</h2>
    <ul className="t7-ul">
      {
        routes.map((route, key) => {
          let name = route.props.path || 'home'
          if (name.split(':')[1]) {
            name = name.split(':')[0] + '123'
          }
          let href = name
          if (href === 'home') {
            href = 'https://mobile-test.united.com/mWeb2/'
          } else {
            href = 'https://mobile-test.united.com/mWeb2/#' + href
          }
          if (name === '*') {
            name = 'page-not-found'
          }
          return (
            <li key={key}>
              <a href={href}>
                {name}
              </a>
            </li>
          )
        })
      }
    </ul>
    <br />
    <h2 className="t7-h2">Design Resources</h2>
    <ul className="t7-ul">
      <li><a href="https://mobile-test.united.com/mWeb2/">Development Server</a></li>
      <li><a href="https://www.dropbox.com/sh/9gkd1h5qmbh45w1/AABNqxsyQ9mirMcRIpBtlCJWa?dl=0">Dropbox (comps)</a></li>
      <li><a href="http://axshare.tandemseven.com/h0v12a/#g=1&p=content_inventory_by_priority">Axure (wireframes)</a></li>
      <li><a href="http://tfs.ual.com:8080/tfs/DefaultCollection/mWeb/_backlogs/board/stories">TFS</a></li>
      <li><a href="https://github.com/TandemSeven/mWeb-Design">Github</a></li>
    </ul>
  </Shell>
)

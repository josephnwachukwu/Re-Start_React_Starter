import React from 'react'

import Shell from './components/shell'
import Card from './components/card'
import FontTest from './components/font_test'

import AirplaneIcon from '../../src/theme/icons/airplane.svg'
import AirplaneCircleIcon from '../../src/theme/icons/airplane_circle.svg'
import ArrowIcon from '../../src/theme/icons/arrow.svg'
import CalendarIcon from '../../src/theme/icons/calendar.svg'
import CalendarIconInverted from '../../src/theme/icons/calendar_inverted.svg'
import CheckIcon from '../../src/theme/icons/check.svg'
import CircleIcon from '../../src/theme/icons/circle.svg'
import CircleCheckIcon from '../../src/theme/icons/circle_check.svg'
import ClockIcon from '../../src/theme/icons/clock.svg'
import CloseIcon from '../../src/theme/icons/close.svg'
import HamburgerIcon from '../../src/theme/icons/hamburger.svg'
import InformationIcon from '../../src/theme/icons/information.svg'
import LogoIcon from '../../src/theme/icons/logo.svg'
import PlusIcon from '../../src/theme/icons/plus.svg'
import PowerIcon from '../../src/theme/icons/power.svg'
import RingIcon from '../../src/theme/icons/ring.svg'
import SignInIcon from '../../src/theme/icons/sign_in.svg'
import StarAllianceIcon from '../../src/theme/icons/star_alliance.svg'
import SuitecaseIcon from '../../src/theme/icons/suitcase.svg'
import WifiIcon from '../../src/theme/icons/wifi.svg'

const colors = {
  'primaryColor': '#2172ba',
  'secondaryColor': '#003057',
  'accentColor': '#024',
  'lightGray': '#cfcfcf',
  'lightGray2': '#f2f2f2',
  'lightGray3': '#e6e6e6',
  'gray': '#666',
  'gray2': '#999',
  'gray3': '#333',
  'green': '#3e7d3b',
  'yellow': '#edb72b',
  'red': '#CD202C',
  'lightBlue': '#BCD1E7',
  'borderColor': '#ccc',
  'outlineColor': '#003057'
}

export default () => (
  <Shell>
    <br />
    <h2 className="t7-h2">Colors</h2>
    <div>
      {
        Object.keys(colors).map((color, key) => (
          <Card
            key={key}
            label={`$${color}: ${colors[color]}`}
            className="t7-card--color"
            style={{backgroundColor: colors[color]}}
          />
        ))
      }
    </div>

    <br />
    <br />

    <h2 className="t7-h2">Fonts</h2>

    <h3 className="t7-h3">Open Sans</h3>
    <Card className="t7-card--font">
      <FontTest style={{fontFamily: 'Open Sans'}} usage={`"Open Sans"`} />
    </Card>

    <h3 className="t7-h3">Operating System Default <small>(Fallback if Open Sans is not available)</small></h3>
    <Card className="t7-card--font">
      <FontTest
        style={{fontFamily: `-apple-system, BlinkMacSystemFont, 'Roboto', 'Droid Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif`}}
        usage={`-apple-system, BlinkMacSystemFont, 'Roboto', 'Droid Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif`}
      />
    </Card>

    <br />
    <br />

    <h2 className="t7-h2">Icons</h2>
    <Card className="t7-card--icon" label="airplane.svg">
      <AirplaneIcon />
    </Card>
    <Card className="t7-card--icon" label="airplane_circle.svg">
      <AirplaneCircleIcon />
    </Card>
    <Card className="t7-card--icon" label="arrow.svg">
      <ArrowIcon />
    </Card>
    <Card className="t7-card--icon" label="calendar.svg">
      <CalendarIcon />
    </Card>
    <Card className="t7-card--icon" label="calendar_inverted.svg">
      <CalendarIconInverted />
    </Card>
    <Card className="t7-card--icon" label="check.svg">
      <CheckIcon />
    </Card>
    <Card className="t7-card--icon" label="circle.svg">
      <CircleIcon />
    </Card>
    <Card className="t7-card--icon" label="circle_check.svg">
      <CircleCheckIcon />
    </Card>
    <Card className="t7-card--icon" label="clock.svg">
      <ClockIcon />
    </Card>
    <Card className="t7-card--icon" label="close.svg">
      <CloseIcon />
    </Card>
    <Card className="t7-card--icon" label="hamburger.svg">
      <HamburgerIcon />
    </Card>
    <Card className="t7-card--icon" label="information.svg">
      <InformationIcon />
    </Card>
    <Card className="t7-card--icon" label="logo.svg">
      <LogoIcon />
    </Card>
    <Card className="t7-card--icon" label="plus.svg">
      <PlusIcon />
    </Card>
    <Card className="t7-card--icon" label="power.svg">
      <PowerIcon />
    </Card>
    <Card className="t7-card--icon" label="ring.svg">
      <RingIcon />
    </Card>
    <Card className="t7-card--icon" label="sign-in.svg">
      <SignInIcon />
    </Card>
    <Card className="t7-card--icon" label="star_alliance.svg">
      <StarAllianceIcon />
    </Card>
    <Card className="t7-card--icon" label="suitecase.svg">
      <SuitecaseIcon />
    </Card>
    <Card className="t7-card--icon" label="wifi.svg">
      <WifiIcon />
    </Card>
  </Shell>
)

import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import UndoBar from './index.js'

describe('UndoBar component', function () {
  it('calls parent container closeUndoBar handler on close of undoBar', function () {
    const closeUndoBar = sinon.spy()
    const undoBar = shallow(
      <UndoBar
        undoPatientName='Michael Jordan'
        showUndo
        closeUndoBar={closeUndoBar}
        undoAction={() => {}}
      />
    )

    undoBar.find('.undo-bar__close-action').simulate('click', { stopPropagation: () => {} })

    expect(closeUndoBar.called).to.equal(true)
  })

  it('calls parent container undoAction handler on undo action of undoBar', function () {
    const undoAction = sinon.spy()
    const undoBar = shallow(
      <UndoBar
        undoPatientName='Michael Jordan'
        showUndo
        closeUndoBar={() => {}}
        undoAction={undoAction}
      />
    )

    undoBar.find('.undo-bar__undo-action').simulate('click', { stopPropagation: () => {} })

    expect(undoAction.called).to.equal(true)
  })

  it('shows the passed message', function () {
    const propMessage = 'Michael Jordan'
    const propFunc = sinon.spy()

    expect((shallow(
      <UndoBar
        undoPatientName={propMessage}
        showUndo
        closeUndoBar={propFunc}
        undoAction={propFunc}
      />)
    ).find('.undo-bar__message-name').text()).to.equal(propMessage)
  })

  it('shows UndoBar when showUndo prop is set to true and hides otherwise', function () {
    const undoBar = mount(
      <UndoBar
        undoPatientName='Michael Jordan'
        showUndo
        closeUndoBar={() => {}}
        undoAction={() => {}}
      />
    )

    expect(undoBar.find('.undo-bar')).to.have.length(1)

    undoBar.setProps({showUndo: false})

    expect(undoBar.find('.undo-bar')).to.have.length(0)
  })

  it('closes when expected because of timeout value including when timeout is set to 0 or not passed as prop', function () {
    let clock = sinon.useFakeTimers()
    const closeUndoBar = sinon.spy()
    const undoLength = 5000

    mount(
      <UndoBar
        undoPatientName='Michael Jordan'
        showUndo
        closeUndoBar={closeUndoBar}
        undoAction={function () {}}
        timeoutLength={undoLength}
      />
    )

    expect(closeUndoBar.called).to.equal(false)

    clock.tick(undoLength)

    expect(closeUndoBar.called).to.equal(true)
  })
})

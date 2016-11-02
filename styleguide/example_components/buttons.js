import Button from '../../src/components/button'

const edit = `
  <div>
    <Button className="ua-button--yellow">
      This is a yellow button
    </Button>

    <br/><br/>

    <Button className="ua-button--gray">
      This is a gray button
    </Button>
  </div>
`

export default {
  dependencies: {Button},
  showPropsFor: Button,
  edit: edit,
  name: 'Buttons'
}

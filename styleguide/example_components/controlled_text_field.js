import { TextField } from '../../src/components/fields'

const edit = `
class Example extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: 'Tom'
    }
    this.handleUpdate = this.handleUpdate.bind(this)
  }
  handleUpdate (update) {
    this.setState(update)
  }
  render () {
    return (
      <label>
        Name:
        <input
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleUpdate}
        />
      </label>
    )
  }
}
ReactDOM.render(<Example/>, mountNode);
`
export default {
  dependencies: {TextField},
  showPropsFor: TextField,
  edit: edit,
  name: 'Text Fields',
  provideRender: true
}

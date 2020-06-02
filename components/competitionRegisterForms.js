import Router from 'next/router'

class CompetitionRegisterForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    Router.push('/registered')
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>審査タイトル</h1>
        <p>(30文字まで)</p>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <h2>審査対象演舞</h2>
        <p>YouTubeの動画URLを指定してください。（６個まで）</p>
        <ur>
          <li><input type="text" value={this.state.value} onChange={this.handleChange} /></li>
          <li><input type="text" value={this.state.value} onChange={this.handleChange} /></li>
          <li><input type="text" value={this.state.value} onChange={this.handleChange} /></li>
          <li><input type="text" value={this.state.value} onChange={this.handleChange} /></li>
          <li><input type="text" value={this.state.value} onChange={this.handleChange} /></li>
          <li><input type="text" value={this.state.value} onChange={this.handleChange} /></li>
        </ur>
        <input type="submit" value="作成" />
      </form>
    )
  }

}

export default CompetitionRegisterForms;
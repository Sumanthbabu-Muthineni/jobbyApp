import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginPage extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onTypePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-block" onSubmit={this.submitForm}>
          <form onSubmit={this.submitForm}>
            <div className="jobby-logo">
              <img
                alt="website logo"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              />
            </div>
            <div className="username-container">
              <label htmlFor="username" className="username">
                USERNAME
              </label>

              <input
                className="input-container"
                id="username"
                type="text"
                placeholder="Username"
                onChange={this.onChangeUsername}
                value={username}
              />
            </div>
            <div className="username-container">
              <label className="username" htmlFor="password">
                PASSWORD
              </label>

              <input
                className="input-container"
                id="password"
                type="password"
                placeholder="Password"
                onChange={this.onTypePassword}
                value={password}
              />
            </div>
            <div className="button-alignment">
              <button className="login-button" type="submit">
                Login
              </button>
            </div>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginPage

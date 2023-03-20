import './index.css'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container-home">
      <div className="website-logo-container">
        <Link to="/" className="style-type">
          <img
            className="home-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </div>
      <ul className="navbar-items style-type">
        <Link to="/" className="style-type">
          <li className="style-type">Home</li>
        </Link>
        <Link to="/jobs" className="style-type">
          <li className="nav_items_between style-type">Jobs</li>
        </Link>

        <li className="style-type">
          <button
            className="button-logout"
            type="button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)

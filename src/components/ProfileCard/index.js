import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const apiConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileCard extends Component {
  state = {apiStatus: apiConstants.initial, profileData: []}

  componentDidMount() {
    this.profileApi()
  }

  profileApi = async () => {
    this.setState({apiStatus: apiConstants.in_progress})
    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        name: data.profile_details.name,
        imageUrl: data.profile_details.profile_image_url,
        bio: data.profile_details.short_bio,
      }
      this.setState({profileData: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderProfileView = () => {
    const {profileData} = this.state
    return (
      <div className="filters-section">
        <img src={profileData.imageUrl} alt="profile" />
        <h1 className="profile-name">{profileData.name}</h1>
        <p className="profile-bio">{profileData.bio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <button type="button" className="button-retry" onClick={this.profileApi}>
        Retry
      </button>
    </div>
  )

  renderProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.success:
        return this.renderProfileView()
      case apiConstants.in_progress:
        return this.renderProgressView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderProfileDetails()}</>
  }
}

export default ProfileCard

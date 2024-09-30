import React, { useEffect } from 'react'
import { GoogleLogin } from 'react-google-login'
import actions from '../../actions'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Loader'

const GoogleSignin = ({ text }) => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.googleSignIn)
  async function handleCredentialResponse(response) {
    const tokenData = { token: response.tokenId }
    dispatch(actions.client.googleSignIn(tokenData))
  }

  const handleGoogleFailureCredential = (response) => {}
  return (
    <>
      <div id='googleButton' style={{ cursor: 'pointer', display: 'flex' }}>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText={text}
          onSuccess={handleCredentialResponse}
          onFailure={handleGoogleFailureCredential}
          cookiePolicy={'single_host_origin'}
          disabled={loading ? true : false}
        />
        {loading && <Loader size='5' />}
      </div>
    </>
  )
}

export default GoogleSignin

import React from 'react'
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

export default class Oauth extends React.Component {
  state = {
    isAuth: false,
    user: null,
    token: ''
  }

  facebookResponse = (response) => {
    const { accessToken: access_token } = response;
    axios.post('http://localhost:3001/auth/facebook/token', { access_token }).then(r => {
      console.log('rsult', r.data);
      const userFb = r.data;
      const user = {
        photo: userFb.photos[0].value,
        displayName: userFb.displayName
      }
      this.setState({ user, isAuth: true });
    }).catch(err => console.log(err));
  }

  render() {
    if (this.state.isAuth) {
      return (
        <div>
          <p>Authenticated</p>
          <h1>{this.state.user.displayName}</h1>
          <img src={this.state.user.photo} />
        </div>
      )
    }
    return (<div>
      <h1>Oauth page</h1>
      <div>
        <FacebookLogin
          appId="984625575060356"
          autoLoad={false}
          fields="name,email,picture"
          callback={this.facebookResponse}
        />

      </div>

    </div>);
  }
}
# OAuth 

## OAuth Facebook Example
  - Has 2 ways to implement facebook login 
    - [Using passport (with standard docs) and redirect callback from backend](http://www.passportjs.org/packages/)
    - If u are using frontend side and want to implement `react-facebook-login` 
      - First create new app to get `clientId` and `clientSecret` from [FacebookDevelopApp](https://developers.facebook.com/apps/)
      - Install `passport-facebook-token` to check the sending access token is invalid or not
      - Create a Post API for checking access token is valid then send back to frontend
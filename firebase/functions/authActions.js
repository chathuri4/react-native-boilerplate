const functions = require('firebase-functions');

export const verifyAuth = (request, response) => {

  const { mode, oobCode, apiKey } = request.query

  console.log('reset passowrd,', request, response)


  if (mode === 'resetPassword') {
    return response.redirect("https://www.lizard-apps.com")

  }

  console.log('not reset password')

  return response.send()

}

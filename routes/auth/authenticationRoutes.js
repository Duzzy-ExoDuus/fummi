let request = require('request')
let querystring = require('querystring')

let client_id = 'f825b4e0dd7c4b6b90a407a573c0de93'
let client_secret = '4d8431bae5ea404a99d42b6f6c6cba34'

let redirect_uri = undefined
let uri = undefined
if (process.env.NODE_ENV === 'production') { 
  redirect_uri = 'https://seed-box.herokuapp.com/callback'
  uri = 'https://seed-box.herokuapp.com/'
} else {
  redirect_uri = 'http://localhost:5000/callback'
  uri = 'http://localhost:3000'
}

module.exports = (app) => {
  app.get('/login', function(req, res) {
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: 'user-read-private user-read-email playlist-modify',
        redirect_uri
      }))
  })

  app.get('/callback', function(req, res) {
    let code = req.query.code || null
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(
          client_id + ':' + client_secret
        ).toString('base64'))
      },
      json: true
    }
    request.post(authOptions, function(error, response, body) {
      var access_token = body.access_token
      res.redirect(uri + '?access_token=' + access_token)
    })
  })
}

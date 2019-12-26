let request = require('request')
let querystring = require('querystring')

let client_id = 'a0c56aa8ac474c29944d275244f5b72a'
let client_secret = '93fea2e0466d41f1a6098a67500627eb'

let redirect_uri = undefined
let uri = undefined
if (process.env.NODE_ENV === 'production') { 
  redirect_uri = 'https://seed-box-backend.herokuapp.com/callback'
  uri = 'https://seed-box-backend.herokuapp.com/'
} else {
  redirect_uri = 'https://seed-box-backend.herokuapp.com/callback'
  uri = 'https://seed-box-backend.herokuapp.com'
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

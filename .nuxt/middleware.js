const middleware = {}

middleware['authenticated'] = require('..\\middleware\\authenticated.js')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

middleware['redirect'] = require('..\\middleware\\redirect.js')
middleware['redirect'] = middleware['redirect'].default || middleware['redirect']

export default middleware

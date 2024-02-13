const { GraphQLError } = require('graphql');
require ('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'mysecret';
const expiration = '2h';
module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req, res }) { // Add res as a parameter
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // [“Bearer”, “<tokenvalue>“]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    if (!token) {
      return req;
    }
    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded.data; // Assign decoded data to req.user
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.log('Access token expired');
        // Redirect to login page when access token expires
        res.redirect('/'); // Redirect to login page
      } else {
        console.log('Invalid token:', error.message);
        // Handle invalid token error
      }
    }
    return req;
  },
  signToken: function ({ firstName, email, _id }) {
    const payload = { firstName, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

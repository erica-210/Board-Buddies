const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'defaultSecret';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req, res }) {
    // Allow the token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret);
      req.user = data; // Assign decoded data to req.user
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.log('Access token expired');
        // Redirect to login page when access token expires
        return res.redirect('/login');
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

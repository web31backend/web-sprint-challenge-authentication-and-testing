/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  if (req.session && req.session.loggedIn) {
      next();
  } else {
      res.status(401).json({ message: "Access Denied" });
  }
};


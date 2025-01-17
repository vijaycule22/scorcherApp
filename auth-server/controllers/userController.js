// controllers/userController.js
const getUserProfile = (req, res) => {
    const userId = req.params.id;
    // Logic to retrieve the user profile from the database (example)
    res.json({ message: `User profile for user ID ${userId}` });
  };
  
  module.exports = {
    getUserProfile,
  };
  
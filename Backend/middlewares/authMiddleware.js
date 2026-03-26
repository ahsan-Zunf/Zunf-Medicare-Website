const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  // Check karega ke kya frontend ne token bheja hai?
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Token ko alag karna
      token = req.headers.authorization.split(' ')[1];

      // Token verify karna (Check karna ke asli hai ya jali)
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ZunfMedicareSecretKey123');
      
      // User ki details aage bhej dena
      req.user = decoded;
      next(); // Rasta clear hai, aage jane do!
      
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Bhai, Token fail ho gaya! Not authorized.' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, koi token nahi mila!' });
  }
};

module.exports = { protect };
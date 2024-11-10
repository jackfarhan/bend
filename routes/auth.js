const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const Admin = require('../models/Admin'); 
const JWT_SECRET = process.env.JWT_SECRET;

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(400).json({ msg: 'Admin not found' });
      }

      console.log(admin.password);
      console.log(password);
      
      if (password !== admin.password) {
        return res.status(400).json({ msg: 'Invalid password' });
      }
      
      const payload = {
        admin: {
          id: admin.id,
          name: admin.name,
        },
      };

      jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res
          .cookie('token', token, { httpOnly: true })
          .json({ token, msg: "Admin logged in successfully", admin: { id: admin.id , name:admin.name} });
      });
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

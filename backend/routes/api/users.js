const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const validator = require('validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email').custom((value) => {
    if (!value || value.trim().length === 0) {
      throw new Error('Please provide a valid email.');
    }
    if (!validator.isEmail(value)) {
      throw new Error('Please provide a valid email.');
    }
    return true;
  }),

  check('username').custom((value) => {
    if (!value || value.trim().length === 0) {
      throw new Error('Please provide a username with at least 4 characters.');
    }
    if (value.length < 4) {
      throw new Error('Please provide a username with at least 4 characters.');
    }
    if (validator.isEmail(value)) {
      throw new Error('Username cannot be an email.');
    }
    return true;
  }),

  check('password').custom((value) => {
    if (!value || value.trim().length === 0) {
      throw new Error('Password must be 6 characters or more.');
    }
    if (value.length < 6) {
      throw new Error('Password must be 6 characters or more.');
    }
    return true;
  }),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    setTokenCookie(res, user);

    return res.json({ user });
  })
);

module.exports = router;

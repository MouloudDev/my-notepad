const express = require('express');
const { requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');
const { Note } = require('../../db/models');

const router = express.Router();

router.use(requireAuth);

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    try {
      const notes = await Note.findAll({ where: { userId } });
      return res.status(200).json(notes);
    } catch (error) {
      const err = new Error('Failed to fetch notes!');
      err.status = 500;
      err.title = 'Fetch Failed';
      err.errors = ['Could not fetch notes. Please try again later.'];
      return next(error);
    }
  })
)

module.exports = router

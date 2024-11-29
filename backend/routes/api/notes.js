const express = require('express');
const { requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');
const { Note } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.use(requireAuth);

const validateNote = [
  check('title')
    .isLength({ min: 1, max: 130 })
    .withMessage('Title must be 1-130 characters long.'),
  check('content')
    .isLength({ min: 1 })
    .withMessage('Content cannot be empty.'),
  handleValidationErrors,
];

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    try {
      const notes = await Note.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']]
      });
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

router.post(
  '/',
  validateNote,
  asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { title, content } = req.body;

    try {
      const createdNote = await Note.create({ title, content, userId });
      return res.status(201).json(createdNote);
    } catch (error) {
      const err = new Error('Failed to create note!');
      err.status = 500;
      err.title = 'Creation Failed';
      err.errors = ['Could not create note. Please try again later.'];
      return next(err);
    }
  })
)

router.patch(
  '/:noteId',
  validateNote,
  asyncHandler(async (req, res, next) => {
    const id = req.params.noteId;
    const { title, content } = req.body;

    try {
      const noteToUpdate = await Note.findByPk(id);

      if (!noteToUpdate) {
        const err = new Error('Note not found!');
        err.status = 404;
        err.title = 'Not Found';
        err.errors = ['The note you are trying to update does not exist.'];
        return next(err);
      }

      noteToUpdate.title = title
      noteToUpdate.content = content
      await noteToUpdate.save()

      return res.status(200).json(noteToUpdate);
    } catch (error) {
      const err = new Error('Failed to update note!');
      err.status = 500;
      err.title = 'Update Failed';
      err.errors = ['Could not update note. Please try again later.'];
      return next(err);
    }
  })
)

module.exports = router

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return await queryInterface.bulkInsert('Notes', [
      {
        title: 'Shopping List',
        content: 'Buy milk, bread, eggs, and butter.',
        userId: 1,
      },
      {
        title: 'Workout Plan',
        content: 'Monday: Chest and Triceps, Wednesday: Back and Biceps, Friday: Legs and Abs.',
        userId: 1,
      },
      {
        title: 'Project Ideas',
        content: 'Develop a task management app with React and Sequelize.',
        userId: 1,
      },
      {
        title: 'Books to Read',
        content: 'Atomic Habits by James Clear, Deep Work by Cal Newport, Clean Code by Robert C. Martin.',
        userId: 1,
      },
      {
        title: 'Meeting Notes',
        content: 'Discuss project timeline and allocate tasks among team members.',
        userId: 1,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op
    return await queryInterface.bulkDelete('Notes', {
      userId: { [Op.in]: [1] }
    });
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.literal('gen_random_uuid()') },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password_hash: { type: Sequelize.STRING, allowNull: false },
      roles: { type: Sequelize.ARRAY(Sequelize.STRING), allowNull: false, defaultValue: [] },
      status: {
        type: Sequelize.ENUM('PENDING', 'APPROVED', 'REJECTED', 'BLOCKED'),
        allowNull: false,
        defaultValue: 'PENDING',
      },
      status_reason: { type: Sequelize.TEXT },
      approved_by: { type: Sequelize.UUID, references: { model: 'users', key: 'id' } },
      approved_at: { type: Sequelize.DATE },
      wallet_address: { type: Sequelize.STRING, unique: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_status";');
  },
};
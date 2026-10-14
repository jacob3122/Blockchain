'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('property_validations', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.literal('gen_random_uuid()') },
      property_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'properties', key: 'id' } },
      validator_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'users', key: 'id' } },
      decision: { type: Sequelize.STRING, allowNull: false },
      reason: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
    });
    await queryInterface.addIndex('property_validations', ['property_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('property_validations');
  },
};

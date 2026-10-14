'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('properties', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.literal('gen_random_uuid()') },
      owner_id: { type: Sequelize.UUID, allowNull: false, references: { model: 'users', key: 'id' } },
      name: { type: Sequelize.STRING },
      property_type: { type: Sequelize.STRING },
      address: { type: Sequelize.STRING },
      city: { type: Sequelize.STRING },
      state: { type: Sequelize.STRING },
      pincode: { type: Sequelize.STRING },
      area_sqft: { type: Sequelize.INTEGER },
      description: { type: Sequelize.TEXT },
      title_deed: { type: Sequelize.STRING, allowNull: false, defaultValue: 'title_deed.pdf' },
      encumbrance_certificate: { type: Sequelize.STRING, allowNull: false, defaultValue: 'encumbrance_certificate.pdf' },
      tax_receipt: { type: Sequelize.STRING, allowNull: false, defaultValue: 'tax_receipt.pdf' },
      status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'DRAFT' },
      submitted_at: { type: Sequelize.DATE },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
    });
    await queryInterface.addIndex('properties', ['owner_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('properties');
  },
};

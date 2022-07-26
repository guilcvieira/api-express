"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("job_candidates", {
      job_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "jobs",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      candidate_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "candidates",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("job_candidates");
  },
};

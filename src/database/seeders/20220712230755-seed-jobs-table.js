"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("jobs", [
      {
        title: "Desenvolvedor Front-End",
        description: "Desenvolver aplicações web com ReactJS",
        limit_date: "2022-04-15",
        company_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Desenvolvedor Back-End",
        description: "Desenvolver aplicações web com NodeJS",
        limit_date: "2022-04-15",
        company_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Desenvolvedor Full-Stack",
        description: "Desenvolver aplicações web com ReactJS e NodeJS",
        limit_date: "2022-04-15",
        company_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("jobs", null, {});
  },
};

const { version } = require('../../package.json');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API',
    version,
    description:
      'This is a REST API application made with Express. It performs CRUD on data of books',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
  },
  // securityDefinitions: {
  //   bearerAuth: {
  //     type: 'apiKey',
  //     name: 'x-auth-token',
  //     scheme: 'bearer',
  //     in: 'header',
  //   },
  // },
  components: {
    securitySchemes: {
      jwt: {
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT"
      },
    }
  }
  ,
  servers: [
    {
      url: 'http://localhost:8000',
    },
  ],
};


module.exports = swaggerDefinition;

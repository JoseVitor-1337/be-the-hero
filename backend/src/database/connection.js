const knex = require('knex')
const { development, test } = require('../../knexfile')

/* 
  Variáveis de Ambientes, estão disponíveis em qualquer lugar da aplicação
  A "NODE_ENV" vai ser criada pelo module cross-env ao execuar "npm test"
*/
const enviroment = process.env.NODE_ENV === 'test' ? test : development

const connection = knex(enviroment);

module.exports = connection
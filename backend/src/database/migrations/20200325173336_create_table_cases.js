
// Criação de uma tabela SQL via Javascriptc
exports.up = function(knex) {
  return knex.schema.createTable('cases', function (table) {
    table.increments(); // Chave primpária incrementando

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    
    table.string('ong_id').notNullable();

    // A Famosa Foreign Key 
    table.foreign('ong_id').references('id').inTable('ongs');
  })
};

// Quando dar algum problema, este método vai ser chamado
exports.down = function(knex) {
  return knex.schema.dropTable('cases')
};

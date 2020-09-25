import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('tasks', table => {
    table.increments('id');
    table.string('name').notNullable().unique();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.integer('project_id')
      .references('id')
      .inTable('projects')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.boolean('is_important').defaultTo(false);
    table.boolean('completed').defaultTo(false);

    table.timestamp('schedule').nullable();
    
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('tasks');
}
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes')
    .where({ id: Number(id) })
    .first()
    .then(scheme => {
        return scheme || null
    })
}

function findSteps(id) {
    return null
}

//needs to resolve to scheme, not id
function add(scheme) {
  return db('schemes')
    .insert(scheme)
}

//needs to resolve to full changes scheme, not 1 or 0
function update(changes, id) {
  return db('schemes')
    .where('id', Number(id))
    .update(changes);
}

//need to resolve to full scheme deleted, not 1 or 0
function remove(id) {
  return db('schemes')
    .where('id', Number(id))
    .del()
}

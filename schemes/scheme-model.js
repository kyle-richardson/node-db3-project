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
  addStep
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
    return db('schemes as a')
        .join('steps as b', 'a.id', 'b.scheme_id')
        .select('b.id','a.scheme_name','b.step_number', 'b.instructions')
        .where('a.id', id)
        .orderBy('b.step_number', 'asc')
        .then(table=> table || null)
}

//needs to resolve to scheme, not id
function add(scheme) {
  return db('schemes')
    .insert(scheme)
    .then(ids => {
        return findById(ids[0]);
    });
}

function addStep(step, id) {
    return db('steps')
        .insert(step, id)
        .then(ids=> db('steps').where({id: ids[0]}))
}

//needs to resolve to full changes scheme, not 1 or 0
function update(changes, id) {
  return db('schemes')
    .where('id', Number(id))
    .update(changes)
    .then(prom => {
        if(prom>0)
            return findById(id);
        else
            return null
      });
}

//need to resolve to full scheme deleted, not 1 or 0
function remove(id) {
    const schemeToDelete = findById(id)
    return db('schemes')
        .where('id', Number(id))
        .del()
        .then(prom=> {
            return schemeToDelete
        })
}

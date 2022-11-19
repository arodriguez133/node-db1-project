const db = require('../../data/db-config');


const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts').where({ id: Number(id) }).first();
}

const create = account => {
  const { name, budget } = account;
  return db('accounts')
    .insert({ name, budget });
}

const updateById = (id, account) => {
  return db("accounts")
    .where(id)
    .update(account);
}

const deleteById = id => {
  return db("accounts")
    .where('id', Number(id))
    .del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

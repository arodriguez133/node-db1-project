const db = require('../../data/db-config');


const getAll = () => {
  return db('accounts');
}

const getById = id => {
  console.log(id);
  return db('accounts').where({ id: Number(id) }).first();
}

const create = account => {
  const { name, budget } = account;
  return db('accounts')
    .insert({ name, budget })
    .then(ids => {
      console.log(ids);
      ({ id: ids[0] })
    });
}

const updateById = (id, account) => {
  return db("accounts")
    .where(id)
    .update(account);
}

const deleteById = id => {
  db("accounts")
    .where(id)
    .del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

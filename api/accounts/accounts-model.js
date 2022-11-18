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
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

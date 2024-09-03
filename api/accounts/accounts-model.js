const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = id => {  
  return db('accounts').where("id", id)
}

const getByName = name => {
  return db('accounts').where({name})
}

const create = (account) => {
  return db('accounts')
    .insert(account)
    .then (res => getById(res))
}

const updateById = (id, account) => {
  return db('accounts')
    .where('id', id)
    .update(account)
    .then(res => (res > 0 ? getById(id) : null))
}

const deleteById = id => {
  return db('accounts')
    .where('id', id)
    .delete()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName
}

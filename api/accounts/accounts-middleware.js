const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if ((!name || !budget) && (!name || budget !== 0)) {  
      res.status(400).json({message: 'name and budget are required'})  
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({message: 'name of account must be between 3 and 100'})
  } else if (isNaN(budget) || typeof budget !== 'number') {
    res.status(400).json({message: 'budget of account must be a number'})
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({message: 'budget of account is too large or too small'})
  } else {
    req.name = name.trim()
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {

  const compare = await Accounts.getByName(req.body.name)
  if(compare[0]) {
    res.status(400).json({message:'that name is taken'})
  } else {
    next()
  }
}

exports.checkAccountId = async (req, res, next) => {
  const account = await Accounts.getById(req.params.id)
  if (!account.length) {
    res.status(404).json({
      message: 'account not found'
    })
  } else {
    req.account = account
    next()
  }
}



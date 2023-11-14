const ApiError = require('../error/ApiError');
const {User} = require('../models/models')


class HistoryController
{
  async getListWithAccount(accountId){
    const account = await Accounts.findOne({
        where:{id: accountId, userId: req.user.id}
    })

    if(!account)
       return next(ApiError.badRequest('Тип счета не предналежит данному пользователю и/или счет не найден'))   

    const histories = await History.findAll({where:{ userId: req.user.id, accountId: accountId }})

    return histories
  }

  async getListWithoutAccount(){
    const histories = await History.findAll({where:{ userId: req.user.id, accountId: accountId }})

    return histories
  }

  async getList(req, res, next)
  {
    const { accountId } = req.body

    const histories = accountId? await this.getListWithAccount(accountId) : await this.getListWithoutAccount()

    return res.json({ histories })
  }

}

module.exports = new HistoryController()
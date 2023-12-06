const ApiError = require('../error/ApiError');
const { Cards, Currency, Accounts, Blocks} = require('../models/models')
const { default: CreditCardGenerator } = require("@mihnea.dev/credit-card-generator");
const { BlockEnum } = require("../utils/constants")
const translatte = require('translatte');
const { Sequelize } = require('sequelize');
const { sequelize } = require('../db');
const accountController = require('./accountController');
/** Initialize new Credit Card Generator */
const carder = new CreditCardGenerator()


class CardController
{
  async getList(req, res, next)
  {
    const cards = await Cards.findAll({
        raw: true,
        where:{userId: req.user.id},
        attributes: [ 'id', 
                      'number',
                      [Sequelize.col('account.currency.type'), 'currency']
        ],
        include: [
            {
                model: Accounts,
                attributes: [],
                include: [
                    {
                        model: Currency,
                        attributes: []
                    }
                ]
            }
        ]
    })

    cards.map(card => {
      card.number = card.number.substring(0, 1) + '***' + card.number.substring(11, 15)
    })


    return res.json({cards})
  }

  async getDetails(req, res, next)
  {
    const  cardId  = parseInt(req.params.id)

   // console.log(cardId)
    //console.log(req.params.id)

    if (!cardId || typeof(cardId) !== 'number')
      return next(ApiError.badRequest('Некорректно задано имя счета'))

    const card = await Cards.findOne({
        where:{id: cardId, userId: req.user.id},
        attributes: [
          'id', 
          'name', 
          //'amount',
          'number',
          'month',
          'year',
          'CVV',
          'accountId',
         // [Sequelize.col('currency.type'), 'currency'],
          //[Sequelize.col('block.type'), 'block']
        ],
        include: [
          {
            model: Blocks,
            attributes: ['type'],
          },  
          {
            model: Accounts,
            attributes: [],
            include: [
                {
                    model: Currency,
                    attributes: []
                }
              ]
            }
        ]
    })
    if(!card)
        return next(ApiError.badRequest('Банковская карта не предналежит данному пользователю и/или не найдена в системе'))   

    return res.json({ card })
  }

  async create(req, res, next){

    const user = req.user

    const account = req.account

    if(account.cardId)
      return next(ApiError.badRequest('Счет имеет карту'))

    const card = carder.generate_one()

    const name = await translatte(user.name + ' ' + user.surname, { from: 'ru', to: 'en'})

    let cardItem = undefined
    try{
      cardItem = await Cards.create({ number: card.number, 
                      month: card.expiry.month, 
                      year: card.expiry.year, 
                      CVV: card.cvv2, 
                      userId: user.id,
                      accountId: account.id,
                      name: name.text,
                      blockId: 0
                    })
    }catch(err){
       return next(ApiError.internal(err.message))   

    }

    account.cardId = cardItem.id

    await account.save()

    return res.json({ cardId: cardItem.id })
  }

  async block(req, res, next)
  {
    let card = req.card
    if(card.blockId != BlockEnum.UNBLOCK)
      return next(ApiError.badRequest('Недостаточно прав или невозможно выполнить блокировку'))

    card.blockId = BlockEnum.LOCKBYUSER
    await card.save()

    return res.json({ success: true })
  }

   async unblock(req, res, next)
  {
    let card = req.card
    if(card.blockId != BlockEnum.LOCKBYUSER)
      return next(ApiError.badRequest('Недостаточно прав или невозможно выполнить разблокировку'))

    card.blockId = BlockEnum.UNBLOCK
    await card.save()

    return res.json({ success: true })
  }

}

module.exports = new CardController()
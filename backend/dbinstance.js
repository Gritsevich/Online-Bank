const {Currency, TypeAccount, Blocks} = require('./models/models')

var cc = require('currency-codes/data');

const createCurrency = async (id, type) => {
    try{
  await Currency.create({
        id: id, 
        type: type
    })
    }catch(e){}
}

const createCurrencies = async () =>{
  cc.map( currency => {
    createCurrency(parseInt(currency.number), currency.code)
  })
}

const createAccountType = async(type) =>{
    try{
  await TypeAccount.create({
        type: type
    })
}catch(e){}
}


const createAccountTypes = async () =>{
  createAccountType("DEBIT")
  createAccountType("CREDIT")
}

const createBlock = async (type) => {
    try{
   await Blocks.create({
        type: type
    })
    }catch(e){}
}


const createBlocks = async() =>{
  createBlock("unblock")
  createBlock("block by user")
  createBlock("block by sysadmin")
}



module.exports = function(){
    createCurrencies()
    createAccountTypes()
    createBlocks()
}
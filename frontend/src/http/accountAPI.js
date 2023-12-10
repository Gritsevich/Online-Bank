import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchAccounts = async () => {
  const {data} = await $authHost.get('api/accounts', )
  return data.accounts
}

export const createAccount = async (account) => {
  const {data} = await $authHost.post('api/accounts/', account)
  return data
}

export const fetchCurrencies = async () => {
  const {data} = await $authHost.get('api/analytics/currencies', )
  return data.currencies
}

export const fetchAccountsWithoutCard = async () => {
  const {data} = await $authHost.get('api/analytics/accountswithoutcard', )
  return data.accounts
}

export const fetchTypes = async () => {
  const {data} = await $authHost.get('api/analytics/typesaccount', )
  return data.types
}

export const fetchOneAccount = async (id) => {
  const {data} = await $authHost.get('api/accounts/' + id, )
  return data.account
}

export const updateAccount = async (account) => {
  const {data} = await $authHost.patch('api/accounts/' + account.id, account)
  return data
}

export const deleteAccount = async (account) => {
  await $authHost.delete('api/accounts/' + account.id)
}

export const createCreditAccount = async (account) => {
  const {data} = await $authHost.post('api/accounts/', account)
  return data
}

export const fetchOneCredit = async (id) => {
  const {data} = await $authHost.get('api/accounts/credits/' + id, )
  return data.credit
}

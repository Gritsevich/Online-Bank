import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchUserAccounts = async () => {
  const {data} = await $authHost.get('api/analytics/accountswithcard', )
  return data.accounts
}

export const createPayment = async (payment) => {
  const {data} = await $authHost.post('api/accounts/transfer', payment)
  return data
}
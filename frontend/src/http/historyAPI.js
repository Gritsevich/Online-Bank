import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchHistory = async (page, limit) => {
  const {data} = await $authHost.get('api/order_history/', {params: {
         page, limit
      }})
  return data
}

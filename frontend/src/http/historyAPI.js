import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchHistory = async () => {
  const {data} = await $authHost.get('api/histories/')
  return data.histories
}

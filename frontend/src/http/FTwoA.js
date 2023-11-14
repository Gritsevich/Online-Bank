import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchQRCode = async () => {
  const {data} = await $authHost.get('api/F2A/QRCode', )
  return data.image
}

export const createFTwoA = async (code) => {
  const {data} = await $authHost.post('api/F2A/set', code)
  return data
}
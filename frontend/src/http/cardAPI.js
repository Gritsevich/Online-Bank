import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchCards = async () => {
  const {data} = await $authHost.get('api/cards', )
  return data.cards
}

export const createCard = async (card) => {
  const {data} = await $authHost.post('api/cards/', card)
  return data
}

export const fetchOneCard = async (id) => {
  const {data} = await $authHost.get('api/cards/' + id, )
  return data.card
}

export const cardBlock = async (card) => {
  const {data} = await $authHost.post('api/cards/block/', card)
  return data
}

export const cardUnblock = async (array) => {
  const {data} = await $authHost.post('api/cards/unblock/', array)
  return data
}
import { Component } from "react"
import { ABOUTACCOUNT_ROUTE, ABOUTCARD_ROUTE, ACCOUNT_ROUTE, AUTH_ROUTE, CARDS_ROUTE, CREDIT_ROUTE, HISTORY_ROUTE, HOMEPAGE_ROUTE, MAINWEBSITE_ROUTE, PAYMENT_ROUTE, REGISTRATION_ROUTE } from "../utils/consts"
import Registration from "../pages/logging/registration"
import Auth from "../pages/logging/auth"
import MainWebsite from "../pages/main/mainwebsite"
import AboutAccount from "../pages/about/aboutaccount"
import AboutCard from "../pages/about/aboutcard"
import Homepage from "../pages/main/homepage"
import Account from "../pages/operations/account"
import Cards from "../pages/operations/cards"
import Credit from "../pages/operations/credit"
import History from "../pages/operations/history"
import Payment from "../pages/operations/payment"

export const authRoutes = [
  {
    path: ABOUTACCOUNT_ROUTE + '/:id',
    Component: AboutAccount
  },

  {
    path: ABOUTCARD_ROUTE + '/:id',
    Component: AboutCard
  },

  {
    path: HOMEPAGE_ROUTE,
    Component: Homepage
  },

  {
    path: ACCOUNT_ROUTE,
    Component: Account
  },

  {
    path: CARDS_ROUTE,
    Component: Cards
  },

  {
    path: CREDIT_ROUTE,
    Component: Credit
  },

  {
    path: HISTORY_ROUTE,
    Component: History
  },

  {
    path: PAYMENT_ROUTE,
    Component: Payment
  },
]

export const publicRoutes = [
  {
    path: REGISTRATION_ROUTE,
    Component: Registration
  },

  {
    path: AUTH_ROUTE,
    Component: Auth
  },

  {
    path: MAINWEBSITE_ROUTE,
    Component: MainWebsite
  },
]
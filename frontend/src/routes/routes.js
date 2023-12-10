import { ABOUTACCOUNT_ROUTE, ABOUTCARD_ROUTE, ACCOUNT_ROUTE, AUTH_ROUTE, CARDS_ROUTE, CREDIT_ROUTE, FTWOA_ROUTE, HISTORY_ROUTE,  MAIN_ROUTE, PAYMENT_ROUTE, REGISTRATION_ROUTE } from "../utils/consts"
import Registration from "../pages/logging/registration"
import Auth from "../pages/logging/auth"
import AboutAccount from "../pages/about/aboutaccount"
import AboutCard from "../pages/about/aboutcard"
import Account from "../pages/operations/account"
import Cards from "../pages/operations/cards"
import Credit from "../pages/operations/credit"
import History from "../pages/operations/history"
import Payment from "../pages/operations/payment"
import Mainpage from "../pages/main/Mainpage"
import FTwoA from '../pages/operations/FTwoA'


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
    path: ACCOUNT_ROUTE,
    Component: Account
  },

  {
    path: CARDS_ROUTE,
    Component: Cards
  },

  {
    path: CREDIT_ROUTE + '/:id',
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

  {
    path: FTWOA_ROUTE,
    Component: FTwoA
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
    path: MAIN_ROUTE,
    Component: Mainpage
  },
]
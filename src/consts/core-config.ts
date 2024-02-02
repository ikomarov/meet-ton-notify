import {CONVERT, FIRST_FIND, PREMIUM_MONTHLY, SUPERLIKE_FOR_USER} from "./products.js";

export const MONTHLY_PAYMENT = 'monthlyPaymentTON'
export const SUPERLIKE_PAYMENT = 'superlikePaymentTON'
export const FIRST_FIND_PAYMENT = 'firstFindPaymentTON'
export const CONVERT_PAYMENT = 'convertPaymentTON'

export const configurations = [
  {code: MONTHLY_PAYMENT, value: '5.0', name: 'Сумма ежемесячной подписки', productId: PREMIUM_MONTHLY},
  {code: SUPERLIKE_PAYMENT, value: '0.5', name: 'Сумма суперлайка', productId: SUPERLIKE_FOR_USER},
  {code: FIRST_FIND_PAYMENT, value: '4.0', name: 'Сумма - Стать первым в поиске', productId: FIRST_FIND},
  {code: CONVERT_PAYMENT, value: '1.0', name: 'Сумма - Превратить лайки в совпадения', productId: CONVERT},
]

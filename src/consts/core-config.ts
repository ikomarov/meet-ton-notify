export const LIMIT = 'limit'
export const LIMIT_PREMIUM = 'limitPremium'
export const LIMIT_FIND = 'limitFind'
export const LIMIT_LIKE_FIND = 'limitLikeFind'
export const LIMIT_PREMIUM_LIKE_FIND = 'limitPremiumLikeFind'
export const MONTHLY_PAYMENT = 'monthlyPayment'
export const SUPERLIKE_PAYMENT = 'superlikePayment'
export const PREMIUM_HOLIDAYS = 'premiumHolidays'
export const HOLIDAYS_TIME = 'holidaysTime'
export const PREMIUM_SUPERLIKE_COUNT = 'premiumSuperLikeCount'
export const MATCH_LIMIT = 'matchLimit'
export const STORIES_LIMIT = 'storiesLimit'
export const PREMIUM_GENDER = 'premiumGender'
export const FIRST_FIND_PAYMENT = 'firstFindPayment'
export const CONVERT_PAYMENT = 'convertPayment'

export const configurations = [
  {code: LIMIT_FIND, value: '30', name: 'Кол-во профилей, которые приходят за один запрос'},
  {code: LIMIT, value: '100', name: 'Кол-во профилей доступных в день для показа'},
  {code: LIMIT_PREMIUM, value: '500', name: 'Кол-во профилей доступных в день для показа с премиумом'},
  {code: LIMIT_LIKE_FIND, value: '0.1', name: 'Кол-во профилей с лайками подмешаных в поиск'},
  {code: LIMIT_PREMIUM_LIKE_FIND, value: '0.25', name: 'Кол-во профилей с лайками подмешаных в поиск с премиумом'},
  {code: MONTHLY_PAYMENT, value: '999', name: 'Сумма ежемесячной подписки'},
  {code: SUPERLIKE_PAYMENT, value: '99', name: 'Сумма суперлайка'},
  {
    code: PREMIUM_HOLIDAYS,
    value: 'true',
    name: 'Вкл/выкл премиум каникул, когда пользователи регаются и в подарок получают премиум'
  },
  {code: HOLIDAYS_TIME, value: '90', name: 'Длительность в днях премиум каникул'},
  {code: PREMIUM_SUPERLIKE_COUNT, value: '1', name: 'Кол-во суперлайков для премиума'},
  {code: MATCH_LIMIT, value: '30', name: 'Кол-во матчей отображаемых во вкладки матч'},
  {code: STORIES_LIMIT, value: '3', name: 'Кол-во доступных историй для загрузки'},
  {code: PREMIUM_GENDER, value: 'A', name: 'Премиум по полу при регистрации'},
  {code: FIRST_FIND_PAYMENT, value: '799', name: 'Стать первым навсегда'},
  {code: CONVERT_PAYMENT, value: '199', name: 'Превратить лайки в совпадения'},
]

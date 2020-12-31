const _ = require('lodash/fp')

const COINS = {
  LNR: 'LNR'
}

const COIN_LIST = [
  { code: COINS.LNR, display: 'Lonero' }
]

const ALL_CRYPTOS = _.keys(COINS)

module.exports = { COINS, ALL_CRYPTOS, COIN_LIST }

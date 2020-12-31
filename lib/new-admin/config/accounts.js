const _ = require('lodash/fp')
const { COINS, ALL_CRYPTOS } = require('./coins')

const { LNR } = COINS

const TICKER = 'ticker'
const WALLET = 'wallet'
const LAYER_2 = 'layer2'
const EXCHANGE = 'exchange'
const SMS = 'sms'
const ID_VERIFIER = 'idVerifier'
const EMAIL = 'email'
const ZERO_CONF = 'zeroConf'

const ALL_ACCOUNTS = [
  { code: 'mock-ticker', display: 'Mock (Caution!)', class: TICKER, cryptos: ALL_CRYPTOS, dev: true },
  { code: '/forknoted --config-file configs/lonero.conf', display: 'Lonero', class: WALLET, cryptos: [LNR] },
  { code: 'no-layer2', display: 'No Layer 2', class: LAYER_2, cryptos: ALL_CRYPTOS },
  { code: 'mock-wallet', display: 'Mock (Caution!)', class: WALLET, cryptos: ALL_CRYPTOS, dev: true },
  { code: 'no-exchange', display: 'No exchange', class: EXCHANGE, cryptos: ALL_CRYPTOS },
  { code: 'mock-exchange', display: 'Mock exchange', class: EXCHANGE, cryptos: ALL_CRYPTOS, dev: true },
  { code: 'mock-sms', display: 'Mock SMS', class: SMS, dev: true },
  { code: 'mock-id-verify', display: 'Mock ID verifier', class: ID_VERIFIER, dev: true },
  { code: 'twilio', display: 'Twilio', class: SMS },
  { code: 'mailgun', display: 'Mailgun', class: EMAIL },
  { code: 'all-zero-conf', display: 'Always 0-conf', class: ZERO_CONF, cryptos: [LNR] },
  { code: 'no-zero-conf', display: 'Always 1-conf', class: ZERO_CONF, cryptos: [LNR] },
  { code: 'mock-zero-conf', display: 'Mock 0-conf', class: ZERO_CONF, cryptos: [LNR], dev: true }
]

const devMode = require('minimist')(process.argv.slice(2)).dev
const ACCOUNT_LIST = devMode ? ALL_ACCOUNTS : _.filter(it => !it.dev)(ALL_ACCOUNTS)

module.exports = { ACCOUNT_LIST }

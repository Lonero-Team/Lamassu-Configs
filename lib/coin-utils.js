const path = require('path')

const _ = require('lodash/fp')

const options = require('./options')

const CRYPTO_CURRENCIES = [
  {
    cryptoCode: 'LNR',
    display: 'Lonero',
    code: 'lonero',
    configFile: 'lonero.conf',
    daemon: './lonerod',
    defaultPort: 34415,
    unitScale: 8 
  }
]

module.exports = {buildUrl, cryptoDir, blockchainDir, configPath, cryptoCurrencies, getCryptoCurrency, toUnit}

function getCryptoCurrency (cryptoCode) {
  const cryptoCurrency = _.find(['cryptoCode', cryptoCode], CRYPTO_CURRENCIES)
  if (!cryptoCurrency) throw new Error(`Unsupported crypto: ${cryptoCode}`)
  return cryptoCurrency
}

function cryptoCurrencies () {
  return CRYPTO_CURRENCIES
}

function buildUrl (cryptoCode, address) {
  switch (cryptoCode) {
    case 'LNR': return `bitcoin:${address}`
    default: throw new Error(`Unsupported crypto: ${cryptoCode}`)
  }
}

function blockchainDir () {
  return options.blockchainDir
}

function cryptoDir (cryptoRec) {
  const code = cryptoRec.code
  return path.resolve(blockchainDir(), code)
}

function configPath (cryptoRec) {
  return path.resolve(cryptoDir(cryptoRec), cryptoRec.configFile)
}

function toUnit (cryptoAtoms, cryptoCode) {
  const cryptoRec = getCryptoCurrency(cryptoCode)
  const unitScale = cryptoRec.unitScale
  return cryptoAtoms.shift(-unitScale)
}

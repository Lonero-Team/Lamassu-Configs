import * as R from 'ramda'

const CRYPTO_CURRENCIES = [
  {
    cryptoCode: 'LNR',
    display: 'Lonero',
    code: 'lonero',
    unitScale: 8
  }
]

function getCryptoCurrency(cryptoCode) {
  const coin = R.find(R.propEq('cryptoCode', cryptoCode))(CRYPTO_CURRENCIES)

  if (!coin) throw new Error(`Unsupported crypto: ${cryptoCode}`)
  return coin
}

function toUnit(cryptoAtoms, cryptoCode) {
  const cryptoRec = getCryptoCurrency(cryptoCode)
  const unitScale = cryptoRec.unitScale
  return cryptoAtoms.shiftedBy(-unitScale)
}

function formatCryptoAddress(cryptoCode = '', address = '') {
  return cryptoCode === 'LNR' ? address.replace('lonero:', '') : address
}

export { toUnit, formatCryptoAddress }

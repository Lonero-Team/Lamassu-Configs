import _ from 'lodash/fp'
import test from 'ava'

import { filterAccounts } from '../../lib/admin/config'

const ALL_CRYPTOS = ['LNR']
const data = {
  accounts: [
    {code: 'mock-ticker', display: 'Mock ticker', class: 'ticker', cryptos: ALL_CRYPTOS},
    {code: './forknoted --config-file configs/lonero.conf', display: 'lonero', class: 'wallet', cryptos: ['LNR']},
    {code: 'mock-wallet', display: 'Mock (Caution!)', class: 'wallet', cryptos: ALL_CRYPTOS}
  ]
}

test('Do not filter accounts in dev mode', t => {
  t.plan(3)
  const devMode = true
  const filteredData = filterAccounts(data, devMode)
  t.is(filteredData.accounts.length, 4)
  t.true(_.some(['code', 'mock-wallet'], filteredData.accounts))
  t.true(_.some(['code', 'mock-ticker'], filteredData.accounts))
})

test('Filter accounts in production', t => {
  t.plan(3)
  const filteredData = filterAccounts(data)
  t.false(_.some(['code', 'mock-wallet'], filteredData.accounts))
  t.false(_.some(['code', 'mock-ticker'], filteredData.accounts))
  t.is(filteredData.accounts.length, 2)
})

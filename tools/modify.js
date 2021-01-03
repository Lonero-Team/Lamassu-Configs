const settingsLoader = require('../lib/admin/settings-loader')

const fields = [
  settingsLoader.configDeleteField({crypto: 'LNR', machine: 'global'}, 'wallet')
]

settingsLoader.modifyConfig(fields)
  .then(() => {
    console.log('success.')
    process.exit(0)
  })

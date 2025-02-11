const path = require('path')

const coinUtils = require('../coin-utils')

const common = require('./common')

module.exports = {setup}

const es = common.es
const logger = common.logger

function setup (dataDir) {
  es('sudo apt-get update')
  es('sudo apt-get install libgomp1 -y')
  const coinRec = coinUtils.getCryptoCurrency('LNR')

  common.firewall([coinRec.defaultPort])
  logger.info('Fetching Lonero proofs, will take a while...')
  es('zcash-fetch-params 2>&1')
  logger.info('Finished fetching proofs.')
  const config = buildConfig()
  common.writeFile(path.resolve(dataDir, coinRec.configFile), config)
  const cmd = `/usr/local/bin/${coinRec.daemon} -datadir=${dataDir}`
  common.writeSupervisorConfig(coinRec, cmd)
}

function buildConfig () {
  return `mainnet=1
addnode=157.230.1.106:34415
rpcuser=lamassuserver
rpcpassword=${common.randomPass()}
dbcache=500
keypool=10000`
}

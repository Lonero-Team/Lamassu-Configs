var db = require('./db')

exports.up = function (next) {
  var sqls = [
    "alter table transactions add crypto_code text default 'LNR'",
    "alter table pending_transactions add crypto_code text default 'LNR'",
    "alter table bills add crypto_code text default 'LNR'",
  ]

  db.multi(sqls, next)
}

exports.down = function (next) {
  next()
}

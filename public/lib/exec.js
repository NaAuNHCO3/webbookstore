const db = require('./sql.js')

const exec = function(sqlArr) {
	return new Promise(function(resolve, reject) {
		const promiseArr = []
		db.getConnection(function(err, conn) {
			if(err) {
				return reject(err)
			}
			conn.beginTransaction(function(err) {
				if(err) {
					return reject(err)
				}
				// 将所有需要执行的sql封装为数组
				promiseArr = sqlArr.map(function({sql, value}) {
					return new Promise(function(resolve, reject) {
						conn.query(sql, value, function(e, results) {
							e ? reject(e) : resolve({ rows, success: true })
						})
					})
				})
				// Promise调用所有的sql，一旦出错则回滚，否则提交事务并释放连接
				Promise.all(promiseArr).then(function(res) {
					conn.commit(function(err) {
						if(err) {
							console.log('commit failed')
							reject(err)
						}
						conn.release()
						resolve(res)
					}).catch(function(err) {
						conn.rollback(function() {
							console.log('rollback')
						})
						reject(err)
					})
				})
			})
		})
	})
}

module.exports = exec

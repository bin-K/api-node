const fs = require('fs')
const path = require('path')

/**
 * @description 遍历文件夹下所有文件
 * @param {*} filePath 文件夹
 * @param {*} callback 回调函数，取得文件名称
 */
const readFile = (filePath, callback) => {
	fs.readdir(filePath, (err, files) => {
		if (err) return console.error(err, '读取文件夹错误')
		files.forEach((fileName) => {
			const fileDir = path.join(filePath, fileName)
			fs.stat(fileDir, (err, stat) => {
				if (err) return console.error(err, '获取文件状态失败')
				if (stat.isDirectory()) {
					readFile(fileDir, callback)
				}
				if (stat.isFile()) {
					callback(fileDir)
				}
			})
		})
	})
}

module.exports = {
	readFile,
}

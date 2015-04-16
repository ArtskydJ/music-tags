var musicMetadata = require('musicmetadata')

module.exports = function getTagData(stream, opts, cb) {
	if (typeof opts === 'function') cb = opts
	var options = (opts && opts.size) ? { duration: true, fileSize: opts.size } : {}
	musicMetadata(stream, options, cb)
}

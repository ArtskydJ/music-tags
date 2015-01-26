var musicMetadata = require('musicmetadata')
var once = require('onetime')

module.exports = function getTagData(stream, opts, callback) {
	if (typeof opts === 'function') callback = opts
	var cb = once(callback || function() {})
	var metadataOpts = (opts && opts.size) ?
		{duration: true, fileSize: opts.size} : {}
	var tagData = musicMetadata(stream, metadataOpts)
	
	var to = setTimeout(cb.bind(null, new Error('timeout')), 10000)
	to.unref && to.unref()
	tagData.once('metadata', cb.bind(null, null))
	tagData.once('done', cb)
}

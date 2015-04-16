var test = require('tape')
var fs = require('fs')
var each = require('async-each')
var musicTags = require('./index.js')

function expected(x) {
	return {
		title: 'title' + x,
		artist: ['artist' + x],
		album: 'album' + x,
		track: {no: x, of:0},
		year: '200' + x,
		genre: ['genre' + x],
	}
}

test('test tags', function (t) {
	t.plan(24)

	var array = [
		{ expect: expected(1), filename: 'test_1.ogg' },
		{ expect: expected(2), filename: 'test_2.mp3' },
		{ expect: expected(3), filename: 'test_3.flac' }
	]

	function iterator(piece, next) {
		var stream = fs.createReadStream('./test-audio/' + piece.filename)
		stream.on('error', function (e) {
			t.notOk(e, 'stream error ' + e.message)
		})
		musicTags(stream, function (err, meta) {
			t.notOk(err, err ? err.message : 'no error')
			t.ok(meta, 'meta is truthey')
			if (!meta) meta = {}
			Object.keys(piece.expect).forEach(function (key) {
				t.deepEqual(meta[key], piece.expect[key], key + ' is good')
			})
			next()
		})
	}

	each(array, iterator, t.end.bind(t))
})

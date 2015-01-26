var test = require('tap').test
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

function testFile(t) {
	return function (index, next) {
		var filename = [ 'test_1.ogg', 'test_2.mp3', 'test_3.flac' ][index]
		var stream = fs.createReadStream('./test-audio/' + filename)
		stream.on('error', function (e) {
			t.notOk(e, 'stream error ' + e.message)
		})
		musicTags(stream, function (err, meta) {
			t.notOk(err, err ? err.message : 'no error')
			t.ok(meta, 'meta is truthey')
			meta = meta || {}
			var expect = expected(index + 1)
			Object.keys(expect).forEach(function (key) {
				t.deepEqual(meta[key], expect[key], key + ' is good')
			})
			next()
		})
	}
}

test('test tags', function (t) {
	each([0, 1, 2], testFile(t), t.end.bind(t))
})
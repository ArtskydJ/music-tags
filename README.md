music-tags
==========

Grab audio tags from your music stream.

Provides an alternative interface to the excellent [musicmetadata][mm] module.

### update

[`musicmetadata@1.x`][mm] has a very similar API to `music-tags`, which was created for `musicmetadata@0.6.3`. If you're interested in the API change, see `musicmetadata` commit [`a616a44`](https://github.com/leetreveil/musicmetadata/commit/a616a44ff04de7a87ce308347af293f25fe5872c).

### supports:

- mp3
- m4a
- ogg
- flac
- wma
- wmv

# example

Display tags:

```js
var fs = require('fs')
var musicTags = require('music-tags')

var stream = fs.createReadStream('./mysong.mp3')
musicTags(stream, function (err, meta) {
	if (err) throw err
	console.log(meta.title, meta.album, meta.artist[0])
})
```

Save album art:

```js
var fs = require('fs')
var musicTags = require('music-tags')

var stream = fs.createReadStream('./mysong.mp3')
musicTags(stream, function (err, meta) {
	if (err) throw err
	var pic = meta.picture[0]
	var name = meta.album + '.' + pic.format
	fs.writeFile(name, pic.data, function (err) {
		if (err) throw err
		console.log('Saved ' + name)
	})
})
```

# api

```js
var musicTags = require('music-tags')
```

## musicTags(stream, [opts,] cb)

- `stream` is a readable stream of an audio file
- `opts` is an object, with the following options:
	- `size` is the size of the file in bytes. If this option is specified, the `duration` will be calculated.
- `data` is an object that looks something like the following:
	- `artist` is an array of strings, one for each artist. E.g. `[ 'nervous_testpilot' ]`
	- `album` is a string of the album name. E.g. `'Frozen Synapse OST'`
	- `albumartist` is an array of strings, one for each album artist. E.g. `[ 'nervous_testpilot' ]`
	- `title` is a string of the song's name. E.g. `'Switch'`
	- `year` is a string of the year. E.g. `'2012'`
	- `track` is an object. E.g. `{ no: 5, of: 11 }`
	- `disk` is an object. E.g. `{ no: 1, of: 1 }`
	- `genre` is an array of strings, one for each genre. E.g. `['Electronic', 'Music']`
	- `picture` is an array of objects. E.g. `[ { format: 'jpg', data: <Buffer> } ]`
	- `duration` is a number in seconds.  E.g. `364`. (Only if `opts.size` is set.)

# install

Install with [npm](https://npmjs.com):
```
npm install music-tags
```

# license

[VOL](http://veryopenlicense.com)

[mm]: https://github.com/leetreveil/musicmetadata

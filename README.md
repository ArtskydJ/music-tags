music-tags
==========

Grab audio tags from your music stream.

Provides an alternative interface to the excellent [musicmetadata](https://github.com/leetreveil/musicmetadata) module.

###Supports:

- mp3
- m4a
- ogg
- flac
- wma
- wmv

#example

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

#api

##musicTags(stream, [opts,] cb)

- `stream` is a readable stream of an audio file
- `opts` is an object, with the following options:
	- `size` is the size of the file in bytes. If this option is specified, the duration will be calculated.
- `data` is an object that looks something like the following:
	- `artist` is an array of strings, one for each artist. E.g. `[ 'nervous_testpilot' ]`
	- `album` is a string of the album name. E.g. 'Frozen Synapse OST'
	- `albumartist` is an array of strings, one for each album artist. E.g. `[ 'nervous_testpilot' ]`
	- `title` is a string of the song's name. E.g. `'Switch'`
	- `year` is a string of the year. E.g. `'2012'`
	- `track` is an object. E.g. `{ no: 5, of: 11 }`
	- `disk` is an object. E.g. `{ no: 1, of: 1 }`
	- `genre` is an array of strings, one for each genre. E.g. `['Electronic', 'Music']`
	- `picture` is an array of objects. E.g. `[ { format: 'jpg', data: <Buffer> } ]`
	- `duration` is a number in seconds. (Only if the `opts.size` is set.) E.g. `364`
}

#install

Install with [npm](https://npmjs.com):
```
npm install music-tags
```

```js
var musicTags = require('music-tags')
```

#license

[VOL](http://veryopenlicense.com)

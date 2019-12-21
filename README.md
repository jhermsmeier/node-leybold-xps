# Leybold XPS data format

[![npm](https://flat.badgen.net/npm/v/leybold-xps)](https://npmjs.com/package/leybold-xps)
[![downloads](https://flat.badgen.net/npm/dm/leybold-xps)](https://npmjs.com/package/leybold-xps)
[![license](https://flat.badgen.net/npm/license/leybold-xps)](https://npmjs.com/package/leybold-xps)
[![ci](https://flat.badgen.net/travis/jhermsmeier/node-leybold-xps/master)](https://travis-ci.org/jhermsmeier/node-leybold-xps)

## Installation

```
npm install --save leybold-xps
```

## Usage

```js
var leybold = require( 'leybold-xps' )
```

### Decoding data

```js
var data = leybold.decode( string, [offset[, length]] )
```

### Encoding data

```js
var encoded = leybold.encode( data )
```

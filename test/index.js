var fs = require( 'fs' )
var path = require( 'path' )
var util = require( 'util' )
var assert = require( 'assert' )
var leybold = require( '..' )

var filename = path.join( __dirname, 'data', 'Leybold.dat' )
var contents = fs.readFileSync( filename, 'utf8' )
var data = leybold.decode( contents )
var encoded = leybold.encode( data )

assert.equal( encoded, contents )

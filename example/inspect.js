var argv = process.argv.slice( 2 )
var fs = require( 'fs' )
var path = require( 'path' )
var util = require( 'util' )
var leybold = require( '..' )

var filename = argv.shift() || path.join( __dirname, '..', 'test', 'data', 'Leybold.dat' )
var contents = fs.readFileSync( filename, 'utf8' )
var data = leybold.decode( contents )
var output = util.inspect( data, {
  depth: null,
  colors: true,
})

console.log( output )

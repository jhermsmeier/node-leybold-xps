var fs = require( 'fs' )
var path = require( 'path' )
var assert = require( 'assert' )
var leybold = require( '..' )

context( 'Leybold', () => {

  var filename = path.join( __dirname, 'data', 'Leybold.dat' )
  var contents = fs.readFileSync( filename, 'utf8' )

  test( 'decode()', () => {

    var data = leybold.decode( contents )

    assert.equal( data.regions.length, 4 )

    assert.equal( data.regions[0].data.length, 241 )
    assert.equal( data.regions[1].data.length, 381 )
    assert.equal( data.regions[2].data.length, 641 )
    assert.equal( data.regions[3].data.length, 247 )

  })

  test( 'encode()', () => {

    var data = leybold.decode( contents )
    var encoded = leybold.encode( data )

    assert.equal( encoded, contents )

  })

})

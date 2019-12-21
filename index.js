var leybold = module.exports

// Parser states
var STATE = {
  NONE: 0,
  META: 1,
  REGION: 2,
  REGION_DATA: 3,
}

// Metadata property (key=value) matching pattern
var propPattern = /^([^=]+)=([^\r\n]+)/
// Title ("text") matching pattern
var titlePattern = /^"([^"]+)"/
// Data (123.45  678.90) matching pattern
var dataPattern = /^\s*(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)/

/**
 * Decode `Leybold.dat` formatted XPS data
 * @param {String} buffer
 * @param {Number} [offset=0]
 * @param {Number} [length]
 * @returns {Object}
 */
leybold.decode = function( buffer, offset, length ) {

  offset = offset || 0
  length = length || ( buffer.length - offset )

  var position = offset
  var end = offset + length

  var state = STATE.NONE
  var region = null
  var data = {
    title: '',
    meta: new Map(),
    regions: []
  }

  while( position < end && ( position = buffer.indexOf( '\n', offset ) ) != -1 ) {

    let line = buffer.slice( offset, position )

    // Skip empty lines
    if( /^\s*$/.test( line ) ) {
      offset = position + 1
      continue
    }

    switch( state ) {

      // Process the file title & advance state -> META
      case STATE.NONE: {
        data.title = line.trim().replace( /^"|"$/g, '' )
        offset = position + 1
        state = STATE.META
        region = { title: '', meta: new Map(), data: [] }
      }; break

      // Process generic file metadata, advance state -> REGION
      case STATE.META: {

        if( !line.startsWith( 'Region=' ) && propPattern.test( line ) ) {
          let [ key, value ] = line.split( '=' )
          data.meta.set( key, value )
          offset = position + 1
        } else {
          state = STATE.REGION
        }
      }; break

      // Process region metadata, then advance state -> REGION_DATA
      case STATE.REGION: {
        if( propPattern.test( line ) ) {
          let [ key, value ] = line.split( '=' )
          region.meta.set( key, value )
          offset = position + 1
        } else if( titlePattern.test( line ) ) {
          region.title = line.trim().replace( /^"|"$/g, '' ).trim()
          offset = position + 1
        } else {
          state = STATE.REGION_DATA
        }
      }; break

      // Process region data records until region end, then set state -> REGION
      case STATE.REGION_DATA: {
        if( !line.startsWith( 'Region=' ) && dataPattern.test( line ) ) {
          var [ _, o, t ] = dataPattern.exec( line )
          region.data.push( [ parseFloat( o ), parseFloat( t ) ] )
          offset = position + 1
        } else {
          state = STATE.REGION
          data.regions.push( region )
          region = { title: '', meta: new Map(), data: [] }
        }
      }; break

    }

  }

  if( region && region.data.length ) {
    data.regions.push( region )
  }

  return data

}

/**
 * Encode XPS data
 * @param {Object} data
 * @param {String} [data.title='Untitled']
 * @param {Array} data.regions
 * @returns {String}
 */
leybold.encode = function( data ) {

  var output = ''

  output += `"${ data.title || 'Untitled' }"\n`

  if( data.meta && data.meta.size ) {
    for( let [ key, value ] of data.meta ) {
      if( !/^TotalNumOfRegions$/i.test( key ) ) {
        output += `${key}=${value}\n`
      }
    }
  }

  output += `TotalNumOfRegions=${ data.regions.length }\n`

  for( var i = 0; i < data.regions.length; i++ ) {

    let region = data.regions[i]

    output += `Region=${ i + 1 }\n`
    output += `"${ region.title || 'Untitled' }"\n`

    for( let [ key, value ] of region.meta ) {
      if( !/^(Region|Npoints)$/i.test( key ) ) {
        output += `${key}=${value}\n`
      }
    }

    output += `Npoints=${ region.data.length }\n`

    for( var k = 0; k < region.data.length; k++ ) {
      output += region.data[k][0].toFixed( 3 ).padStart( 12, ' ' ) + '  '
      output += region.data[k][1].toFixed( 3 ).padStart( 12, ' ' )
      output += '\n'
    }

  }

  return output

}

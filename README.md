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

Result:

```js
{
  title: 'Au sample deposited by Zr for 20 min   ',
  meta: Map(1) { 'TotalNumOfRegions' => '4' },
  regions: [
    {
      title: 'O 1s',
      meta: Map(2) { 'Region' => '1', 'Npoints' => '241' },
      data: [
        [ 537.691, 16978 ],
        [ 537.641, 17076 ],
        [ 537.591, 17065.3 ],
        [ 537.541, 17304.7 ],
        [ 537.491, 17156.7 ],
        ... 236 more items
      ]
    },
    {
      title: 'C 1s',
      meta: Map(2) { 'Region' => '2', 'Npoints' => '381' },
      data: [
        [ 293.631, 9316 ],
        [ 293.581, 9418 ],
        [ 293.531, 9453.33 ],
        [ 293.481, 9460 ],
        [ 293.431, 9450 ],
        ... 376 more items
      ]
    },
    {
      title: 'Zr 3d',
      meta: Map(2) { 'Region' => '3', 'Npoints' => '641' },
      data: [
        [ 191.691, 10276.7 ],
        [ 191.666, 10201.3 ],
        [ 191.641, 10281.3 ],
        [ 191.616, 10272 ],
        [ 191.591, 10168 ],
        ... 636 more items
      ]
    },
    {
      title: 'Au 4f',
      meta: Map(2) { 'Region' => '4', 'Npoints' => '247' },
      data: [
        [ 91.591, 6446 ],
        [ 91.541, 6563.33 ],
        [ 91.491, 6538.67 ],
        [ 91.441, 6628 ],
        [ 91.391, 6490 ],
        ... 242 more items
      ]
    }
  ]
}
```

### Encoding data

```js
var encoded = leybold.encode( data )
```

Result:

```
"Au sample deposited by Zr for 20 min   "
TotalNumOfRegions=4
Region=1
"O 1s"
Npoints=241
    537.691     16978.000
    537.641     17076.000
    ...
Region=2
"C 1s"
Npoints=381
    293.631      9316.000
    293.581      9418.000
    ...
Region=3
"Zr 3d"
Npoints=641
    191.691     10276.700
    191.666     10201.300
    ...
Region=4
"Au 4f"
Npoints=247
    91.591      6446.000
    91.541      6563.330
    ...
```

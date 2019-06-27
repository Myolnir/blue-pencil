# blue-pencil 

Mask your JSON values as of a given array of not allowed fields.

![Build Status](https://travis-ci.org/Myolnir/blue-pencil.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/Myolnir/blue-pencil/badge.svg?branch=master)](https://coveralls.io/github/Myolnir/blue-pencil?branch=master)
[![license](https://img.shields.io/npm/l/blue-pencil.svg)](https://github.com/myolnir/blue-pencil/blob/master/LICENSE)
[![David](https://img.shields.io/david/myolnir/blue-pencil.svg)](https://david-dm.org/myolnir/blue-pencil)
[![npm](https://img.shields.io/npm/v/blue-pencil.svg)](https://www.npmjs.com/package/blue-pencil)


# Usage

The main export of this library is [`BluePencil`](#markdown-header-bluePencil), a utility
that receives a JSON and an array of elements and returns the same JSON with the given elements
with asterisks.

# Install

You can install blue-pencil using npm.

```
npm install --save blue-pencil
```

# API

Exported symbols:

- [BluePencil](#markdown-header-bluePencil)

**Kind**: global class  

* [BluePencil](#markdown-header-bluePencil)
    * [new BluePencil(options)](#markdown-header-new-bluePencil-options)
    * [.censor(objectToCensor, valuesToHide)](#markdown-header-bluePencilcensor) ⇒ <code>Object</code> &#124; <code>Array</code>

### new BluePencil(options)
<p>Create an BluePencils that hide the give keys in a given object.</p>

<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>options</td><td>object</td><td></td>
    </tr><tr>
    <td>options.wildcard</td><td>string</td><td><p>Wildcard we would like to use for the mask (e.g.: <code>#####</code>)</p></td>
    </tr><tr>
</table>

<a name="module_blue-pencil"></a>

**Example**  
```javascript
const bluePencil = require('blue-pencil');
let myBluePencil = new BluePencil({escapeWildcard: '#####'});
```

### blue-pencil.censor(objectToCensor, valuesToHide) ⇒ <code>Object</code> &#124; <code>Array</code>
Returns the given object but with the given values masked.

**Type**: static method of <code>[blue-pencil](#module_blue-pencil)</code>  
**Returns**: <code>Object</code> The new object with the values masked.  

<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>objectToCensor</td><td><code>Object</code> &#124; <code>Array</code></td><td>Input data to be filtered</td>
    </tr><tr>
    <td>valuesToHide</td><td><code>Array</code></td><td><p>Elements to mask in the given object</td>
    </tr><tr>
</table>

**Example**  
```javascript
 const bluePencil = require('blue-pencil');

let myBluePencil = new BluePencil({escapeWildcard: '#####'});

const nestedObj = {
  root: [{
    foo: 'bar',
  }],
};

const valuesToHide = ['foo'];

// censor
const filteredObject = myBluePencil.censor(nestedObj, valuesToHide)

```

# License

MIT @ Angel Muelas Martinez
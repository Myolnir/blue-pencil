const flat = require('flat');
const unflat = require('flat').unflatten;
const {WILDCARD} = require('./constants');


/**
 * Hide not allowed fields.
 * @param flattenData
 * @param valuesToHide the blacklist of the fields we would like to hide.
 * @returns filtered data according with the given values to hide.
 * @private
 */
function _filter (flattenData, valuesToHide) {
  const result = {};
  for (const key in flattenData) {
    let regex = key.replace(/[0-9]/g, '').replace(/[.]{2,}/g, '.');
    regex.endsWith('.') ? regex = regex.substring(0, regex.length - 1) : regex;
    if (valuesToHide.length > 0 && !valuesToHide.includes(regex)) {
      result[key] = this.options.escapeWildcard ? this.config.escapeWildcard : WILDCARD;
    }
  }
  return result;
}

function _filterArrayData (dataToFilter, filteringFields) {
  const filterData = [];
  dataToFilter.forEach((arrayElement) => {
    let flattenElement = flat(arrayElement);
    flattenElement = _filter(flattenElement, filteringFields);
    filterData.push(unflat(flattenElement));
  });
  return filterData;
}

function _filterNonArrayData (dataToFilter, filteringFields) {
  let flattenElement = flat(dataToFilter);
  flattenElement = _filter(flattenElement, filteringFields);
  return unflat(flattenElement);
}

module.exports = class BluePencil {

  constructor (options) {
    if (typeof options !== 'object') {
      throw new Error('"options" must be an object');
    }
    this.options = options;
  }

  /**
   *
   * @param dataToFilter - JSON object to blue-pencil
   * @param valuesToHide - list of values we would like to hide in our JSON
   * @returns {{}}
   */
  bluePencilData (dataToFilter, valuesToHide) {
    let filterData = {};
    if (Array.isArray(dataToFilter)) {
      filterData = _filterArrayData(dataToFilter, valuesToHide);
    } else {
      filterData = _filterNonArrayData(dataToFilter, valuesToHide);
    }
    return filterData;
  }


};

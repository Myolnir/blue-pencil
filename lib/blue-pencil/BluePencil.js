const flat = require('flat');
const unflat = require('flat').unflatten;
const {WILDCARD} = require('./constants');

function shouldMaskValue(valuesToHide, regex) {
  return valuesToHide.some((value) => regex.split('.').includes(value));
}

/**
 * Hide not allowed fields.
 * @param flattenData
 * @param valuesToHide the blacklist of the fields we would like to hide.
 * @returns filtered data according with the given values to hide.
 * @private
 */
function _filter (flattenData, valuesToHide, options) {
  const result = {};
  for (let key in flattenData) {
    let regex = key.replace(/[0-9]/g, '').replace(/[.]{2,}/g, '.');
    regex.endsWith('.') ? regex = regex.substring(0, regex.length - 1) : regex;
    if (valuesToHide.length > 0 && shouldMaskValue(valuesToHide, regex)) {
      result[key] = options && options.wildcard ? options.wildcard : WILDCARD;
    } else {
      result[key] = flattenData[key];
    }
  }
  return result;
}

function _filterArrayData (dataToFilter, filteringFields, options) {
  const filterData = [];
  dataToFilter.forEach((arrayElement) => {
    let flattenElement = flat(arrayElement);
    flattenElement = _filter(flattenElement, filteringFields, options);
    filterData.push(unflat(flattenElement));
  });
  return filterData;
}

function _filterNonArrayData (dataToFilter, filteringFields, options) {
  let flattenElement = flat(dataToFilter);
  flattenElement = _filter(flattenElement, filteringFields, options);
  return unflat(flattenElement);
}

module.exports = class BluePencil {

  constructor (options) {
    if (options) {
      if (typeof options !== 'object') {
        throw new Error('"options" must be an object');
      }
      if (typeof options === 'object') {
        if (!options.wildcard) {
          throw new Error('"options.wildcard" must be a string');
        }
      }
    }
    this.options = options;
  }

  /**
   *
   * @param dataToFilter - JSON object to blue-pencil
   * @param valuesToHide - list of values we would like to hide in our JSON
   * @returns {{}}
   */
  censor (dataToFilter, valuesToHide) {
    let filterData = {};
    if (Array.isArray(dataToFilter)) {
      filterData = _filterArrayData(dataToFilter, valuesToHide, this.options);
    } else {
      filterData = _filterNonArrayData(dataToFilter, valuesToHide, this.options);
    }
    return filterData;
  }


};

const BluePencil = require('../lib/blue-pencil/BluePencil');

describe('BluePencil tests', () => {

  const objectToCensor = {
    root: [{
      foo: 'bar',
    }],
  };
  const valuesToHide = ['foo'];

  it('should return an error if we initialize wrongly the lib', () => {
    expect(() => new BluePencil('badConfig')).toThrow(new Error('"options" must be an object'));
  });

  it('should return an error if we initialize properly the lib but with a not allowed options field', () => {
    expect(() => new BluePencil({})).toThrow(new Error('"options.wildcard" must be a string'));
  });

  it('should return an error if we initialize properly the lib but with a not allowed options field', () => {
    let myBluePencil = new BluePencil({wildcard: '#####'});
    expect(myBluePencil).toBeInstanceOf(BluePencil)
  });

  it('given an object should return expected object masked', () => {
    let myBluePencil = new BluePencil();
    const expectedObject = {
      root: [{
        foo: '******',
      }],
    };
    const result = myBluePencil.censor(objectToCensor, valuesToHide);
    expect(result).toStrictEqual(expectedObject);
  });

  it('given an object should return expected object masked with the given wildcard', () => {
    let myBluePencil = new BluePencil({wildcard: '######'});
    const expectedObject = {
      root: [{
        foo: '######',
      }],
    };
    const result = myBluePencil.censor(objectToCensor, valuesToHide);
    expect(result).toStrictEqual(expectedObject);
  });

  it('given an array of objects should return expected object masked', () => {
    let myBluePencil = new BluePencil();
    const expectedObject = [{
      root: [{
        foo: '******',
      }],
    }];
    const result = myBluePencil.censor([objectToCensor], valuesToHide);
    expect(result).toStrictEqual(expectedObject);
  });

  it('given an array of object should return expected object masked with the given wildcard', () => {
    let myBluePencil = new BluePencil({wildcard: '######'});
    const expectedObject = [{
      root: [{
        foo: '######',
      }],
    }];
    const result = myBluePencil.censor([objectToCensor], valuesToHide);
    expect(result).toStrictEqual(expectedObject);
  });

  it('given an object and no values to hide should return the given object', () => {
    let myBluePencil = new BluePencil({wildcard: '######'});
    const result = myBluePencil.censor(objectToCensor, []);
    expect(result).toStrictEqual(objectToCensor);
  })
});
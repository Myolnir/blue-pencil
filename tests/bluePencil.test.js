const BluePencil = require('../lib/blue-pencil/BluePencil');

describe('BluePencil tests', () => {

  it('should return an error if we initialize wrongly the lib', () => {
    expect(() => new BluePencil('badConfig')).toThrow(new Error('"options" must be an object'));
  });

  it('should not return an error if we initialize properly the lib', () => {
    let myBluePencil = new BluePencil({});
    expect(myBluePencil).toBeInstanceOf(BluePencil)
  })
});
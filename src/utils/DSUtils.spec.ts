import { DSUtils } from './DSUtils';

describe('DSUtils suite', () => {
  it('Should return true if localStorage is available', () => {
    expect.assertions(1);
    const isAvailable = DSUtils.storageAvailable('localStorage');
    expect(isAvailable).toBeTruthy();
  });

  it('Should return true if sessionStorage is available', () => {
    expect.assertions(1);
    const isAvailable = DSUtils.storageAvailable('sessionStorage');
    expect(isAvailable).toBeTruthy();
  });

  it('Should return false if a random String is provided', () => {
    expect.assertions(1);
    const randomString = Math.random()
      .toString(36)
      .substring(7);
    const isAvailable = DSUtils.storageAvailable(randomString);
    expect(isAvailable).toBeFalsy();
  });

  it('Should return false if the storage throws an Exception', () => {
    expect.assertions(1);
    (window as any).mockStorage = {
      storage: [],
      setItem: (label: string, value: string) => {
        throw DOMException.QUOTA_EXCEEDED_ERR;
      }
    };
    const isAvailable = DSUtils.storageAvailable('mockStorage');

    expect(isAvailable).toBeFalsy();
  });

  it('Should return false if the Storage is an Exception and storage === 0', () => {
    expect.assertions(1);
    (window as any).mockStorage = {
      length: 1,
      setItem: (label: string, value: string) => {
        throw DOMException.QUOTA_EXCEEDED_ERR;
      }
    };

    const isAvailable = DSUtils.storageAvailable('mockStorage');

    expect(isAvailable).toBeFalsy();
  });

  it('Should evaluate if the object provided is valid Header', () => {
    expect.assertions(2);
    const headers = { 'Content-Type': 'application/json' };
    const isValidHeader = DSUtils.validateHeaders(headers);

    expect(isValidHeader).toBeTruthy();
    try {
      const invalidHeader = DSUtils.validateHeaders('hola');
    } catch (error) {
      expect(error.message).toEqual('DSUtils: Invalid headers. hola');
    }
  });

  it('Should evaluate if the object provided is valid Endpoint', () => {
    expect.assertions(2);
    const validEndpoint = 'https://api.yapo.cl';
    const isValidEndpoint = DSUtils.validateEndpoint(validEndpoint);

    expect(isValidEndpoint).toBeTruthy();
    try {
      const invalidEndpoint = DSUtils.validateEndpoint(' 123');
    } catch (error) {
      expect(error.message).toEqual('DSUtils: Invalid endpoint 123');
    }
  });

  it('Should evaluate if the object provided is valid Endpoint', () => {
    expect.assertions(3);
    const serializableObject = { commune: '13001', region: '13' };
    const isSerializableObject = DSUtils.serialize(serializableObject);
    expect(isSerializableObject).toEqual('?commune=13001&region=13');

    const queryString = DSUtils.serialize('?commune=13001&region=13');
    expect(queryString).toEqual('?commune=13001&region=13');

    const emptyString = DSUtils.serialize('');
    expect(emptyString).toEqual('');
  });
});

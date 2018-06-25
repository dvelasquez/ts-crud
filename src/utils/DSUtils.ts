/**
 * @class DSUtils
 * @desc Utility snippets to DataSources
 */

export class DSUtils {
  /**
   * @method storageAvailable
   * @desc Test if the storage provided is available in the browser or not.
   * (Only for localStorage & sessionStorage)
   * @param type String name of the storage
   * @returns {boolean}
   */
  public static storageAvailable(type: string) {
    const storage: any = (window as any)[type];
    try {
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.code === DOMException.QUOTA_EXCEEDED_ERR &&
        storage.length !== 0
      );
    }
  }

  /**
   * @method validateHeaders
   * @desc validate headers to add.
   * @param headers Object headers to evaluate
   * @returns Object Valid object or throws an exception.
   */
  public static validateHeaders(headers: string | any): string {
    if (headers && typeof headers === 'object') {
      return headers;
    }
    throw Error(`DSUtils: Invalid headers. ${headers.toString()}`);
  }

  /**
   * @todo: create a function that validates that is a valid http/s resource should be useful
   * @method validateEndpoint
   * @desc validate that is a valid string endpoint
   * @param endpoint String the string to be validated
   * @returns {string} the endpoint if is valid, otherwise should throw an Error.
   */
  public static validateEndpoint(endpoint: string): string {
    if (endpoint && typeof endpoint === 'string' && endpoint.length > 10) {
      return endpoint;
    }
    throw Error(`DSUtils: Invalid endpoint${endpoint.toString()}`);
  }

  /**
   * @method serialize
   * @desc Serialize an object to a valid http querystring.
   * If the string is a valid querystring, returns the string.
   * @param body String|Object the object to be serialized.
   * @returns {string} the serialized object.
   */
  public static serialize(body: any): string {
    if (body && typeof body === 'object') {
      return `?${Object.keys(body)
        .reduce((a: any, k: string) => {
          if (!this.isObjectEmpty(body[k])) {
            a.push(`${k}=${encodeURIComponent(body[k])}`);
          }
          return a;
        }, [])
        .join('&')}`;
    } else if (typeof body === 'string' && body.substring(0, 1) === '?') {
      return body;
    }
    return '';
  }

  private static isObjectEmpty(object: any): boolean {
    return Object.keys(object).length === 0 && object.constructor === Object;
  }
}

import { DSUtils } from '../utils/DSUtils';
import { CRUD } from '../CRUD';

/**
 * @class RestDS
 * @desc A CRUD data source for restful api
 */
export class RestDS implements CRUD {
  private endpoint: string;
  private headers: any;
  private dsUtils: any;

  /**
   * @method constructor
   * @param endpoint String REST endpoint (ie: https://api.org/
   * @param headers Object Header object (ie: { 'Content-Type': 'application/json'})
   */
  constructor(endpoint: string, headers: any) {
    this.endpoint = DSUtils.validateEndpoint(endpoint);
    this.headers = RestDS.setCustomHeaders(headers);
    this.dsUtils = DSUtils;
  }

  /**
   * @todo: Check why the default content-type header is not set when creating a new instance.
   * @method setCustomHeaders
   * @desc Set additional headers.
   * @param headers Header object with key:value representing http headers.
   * @returns {Headers} A Header object.
   */
  public static setCustomHeaders(headers: any): any {
    DSUtils.validateHeaders(headers);
    return { 'Content-Type': 'application/json', ...headers };
  }

  /**
   * @method $read
   * @desc Read wrapper
   * @param key String url (ie: 'users')
   * @param body String|Object querystring or object for the request.
   * @param customHeaders Object additional headers for this request.
   * @returns {Promise<*>} a Promise with the requested resource.
   */
  public $read(
    key: string,
    body?: any,
    customHeaders?: any
  ): Promise<any | any[]> {
    return new Promise((resolve, reject) => {
      if (key) {
        return resolve(this.$fetch('GET', key, body, customHeaders));
      }
      return reject(new Error('RESTDS: unable to make $get'));
    });
  }

  /**
   * @method $create
   * @param key String url (ie: 'users')
   * @param body Object object that should be created.
   * @param customHeaders Object additional headers for this request.
   * @returns {Promise<*>} a Promise with the created resource
   */
  public $create(
    key: string,
    body: any,
    customHeaders: any
  ): Promise<any | any[]> {
    return new Promise((resolve, reject) => {
      if (key) {
        return resolve(this.$fetch('POST', key, body, customHeaders));
      }
      return reject(new Error('RESTDS: unable to make $post'));
    });
  }

  /**
   * @method $update
   * @param key String url (ie: 'users')
   * @param body Object object that should be updated.
   * @param customHeaders Object additional headers for this request.
   * @returns {Promise<*>} a Promise with the updated resource.
   */
  public $update(
    key: string,
    body: any,
    customHeaders: any
  ): Promise<any | any[]> {
    return new Promise((resolve, reject) => {
      if (key) {
        return resolve(this.$fetch('PUT', key, body, customHeaders));
      }
      return reject(new Error('RESTDS: unable to make $update'));
    });
  }

  /**
   * @method $delete
   * @param key String url (ie: 'users')
   * @param body Object object that should be deleted.
   * @param customHeaders Object additional headers for this request.
   * @returns {Promise<*>} a Promise with a result of the deletion.
   */
  public $delete(
    key: string,
    body: any,
    customHeaders: any
  ): Promise<any | any[]> {
    return new Promise((resolve, reject) => {
      if (key) {
        return resolve(this.$fetch('DELETE', key, body, customHeaders));
      }
      return reject(new Error('RESTDS: unable to make $delete'));
    });
  }

  /**
   * @method $fetch
   * @desc Wrapper for the js fetch API.
   * @param method String HTTP method (ie: GET POST PUT DELETE)
   * @param resource String url (ie: 'users')
   * @param body String|Object querystring or object for the request.
   * @param customHeaders Object additional headers for this request.
   * @returns {Promise<*>} Promise with a result of the fetch API.
   */
  public $fetch(
    method: string,
    resource: string,
    body: any,
    customHeaders: any
  ): Promise<any | any[]> {
    return new Promise((resolve, reject) => {
      if (method && resource) {
        let serverReq: Promise<any> = new Promise(() => true);
        if (method && method === 'GET') {
          const validatedHeaders = customHeaders
            ? DSUtils.validateHeaders(customHeaders)
            : {};
          const serializedBody = DSUtils.serialize(body);

          serverReq = fetch(this.endpoint + resource + serializedBody, {
            headers: {
              ...this.headers,
              ...validatedHeaders
            },
            method
          });
        } else if (method) {
          const validatedHeaders = customHeaders
            ? DSUtils.validateHeaders(customHeaders)
            : {};

          const request = {
            headers: {
              ...validatedHeaders,
              ...this.headers
            },
            body,
            method
          };
          serverReq = fetch(this.endpoint + resource, request);
        }
        return serverReq
          .then(data => {
            if (data.status === 304) {
              return reject(data);
            }
            return resolve(data.json());
          })
          .catch(error => reject(error));
      }
      return reject(new Error('RESTDS: Invalid request'));
    });
  }
}

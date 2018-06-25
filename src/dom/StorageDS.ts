import { CRUD } from '@/CRUD';
import { LocalStorage } from '@/dom/LocalStorage';
import { WebStorage } from '@/dom/WebStorage';
import { SessionStorage } from '@/dom/SessionStorage';

/**
 * @class StorageDS
 * @desc A CRUD wrapper of the localStorage web api.
 */
export class StorageDS implements CRUD {
  private storage: WebStorage;

  constructor(type?: string) {
    // TODO: implementar factory para lógica de Storage
    // https://github.schibsted.io/Yapo/altiro/pull/19#discussion_r448585
    if (type === 'LocalStorage') {
      this.storage = new LocalStorage();
    } else if (type === 'SessionStorage') {
      this.storage = new SessionStorage();
    } else {
      throw Error('Storage: type storage not exist');
    }
  }

  /**
   * @method $read
   * @desc Retrieves a stored item
   * @param key String Name of the item
   * @returns {Promise<Object>} Should return a JSON object or an Error.
   */
  public async $read(key: string): Promise<any> {
    return this.$storage('getItem', key, {});
  }

  /**
   * @todo: should return the persisted object?
   * @method $create
   * @desc Creates a new item in the storage
   * @param key String Name of the item
   * @param body Object Object to be persisted. Should be always an Object.
   * @returns {Promise<*>} On success returns nothing or an Error.
   */
  public async $create(key: string, body: object): Promise<any> {
    return this.$storage('setItem', key, body);
  }

  /**
   * @todo: should validate if the key to update already exists.
   * @method $update
   * @desc update an item in the storage
   * @param key String Name of the item
   * @param body Object Object to be updated. Should be always an Object.
   * @returns {Promise<*>} On success returns nothing or an Error.
   */
  public async $update(key: string, body: object): Promise<any> {
    try {
      const storedItem = await this.$read(key);
      if (storedItem) {
        return this.$storage('setItem', key, body);
      }
      throw Error('STORAGEDS: Cant update item because the key doesnt exists.');
    } catch (error) {
      return error;
    }
  }

  /**
   * @method $delete
   * @desc deletes an item in the storage
   * @param key String Name of the item
   * @returns {Promise<*>} On success returns nothing or an Error.
   */
  public async $delete(key: string): Promise<any> {
    try {
      const storedItem = await this.$read(key);
      if (storedItem) {
        return this.$storage('removeItem', key, {});
      }
      throw Error('STORAGEDS: Cant delete item because the key doesnt exists.');
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method $clear
   * @desc Wrapper for the $storage clear api.
   * This function will deletes all the keys and values stored.
   * @returns {Promise<*>} A if everything goes ok, should return a fulfilled promise.
   */
  public async $clear(): Promise<any> {
    return this.$storage('clear', '', {});
  }

  /**
   * @method $length
   * @desc Wrapper for the $storage clear api.
   * This function will deletes all the keys and values stored.
   * @returns {Promise<Number>} The number of values stored in the storage (quantity of keys).
   */
  public async $length(): Promise<number> {
    return this.$storage('length', '', {});
  }

  /**
   * @method $storage
   * @desc Wrapper of localStorage api
   * @param method String action to be performed on the api
   * @param key String|Number index we are interacting to.
   * @param body payload Array|Object of data to be inserted
   * @returns {Promise<*>} Result, in case of the 'getItem' returns a json.
   */
  public async $storage(
    method: string,
    key: string,
    body?: object
  ): Promise<any> {
    try {
      switch (method) {
        case 'getItem':
          if (!key || key.length === 0) {
            throw Error('Storage.$storage: Missing parameter key');
          }
          return await this.storage.getItem(key);
        case 'setItem':
          return await this.storage.setItem(key, JSON.stringify(body));
        case 'removeItem':
          return await this.storage.removeItem(key);
        case 'key':
          return await this.storage.key(parseInt(key, 10));
        case 'length':
          return await this.storage.length();
        case 'clear':
          return await this.storage.clear();
        default:
          return null;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method checkAvailability
   * @desc tests if the storage is available or not.
   * @returns boolean TRUE if the storage is available in this browser.
   */
  public async checkAvailability(): Promise<boolean> {
    return this.storage.checkAvailability();
  }
}

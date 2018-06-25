/**
 * @interface WebStorage
 * @desc A storage interface that should implement in all cache services.
 */
export interface WebStorage {
  /**
   * Sets key to value on the backing storage
   * @param key to get a element
   * @param value to set a element
   * @returns {*}
   */
  setItem(key: string, value: string): any;

  /**
   * Gets a specific value from storage
   * @param key to get element
   * @returns {*}
   */
  getItem(key: string): any;

  /**
   * Let remove a specific value from storage
   * @param key to delete an element
   */
  removeItem(key: string): void;

  /**
   * Gets the name for the requested indexed key
   * @param key with a index of element
   * @returns {string | null}
   */
  key(key: number): string | null;

  /**
   * Get length of storage
   * @returns {number}
   */
  length(): number;

  /**
   * remove all data from storage
   * @returns {boolean}
   */
  clear(): void;

  /**
   * Tells whether or not the storage is available and ready
   * @returns {boolean}
   */
  checkAvailability(): boolean;
}

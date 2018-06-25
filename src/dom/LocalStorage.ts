import { WebStorage } from '@/dom/WebStorage';
import { DSUtils } from '@/utils/DSUtils';

/**
 * Class to save to cache info
 * @class LocalStorage
 * @desc A Storage class to save data into localStorage
 */
export class LocalStorage implements WebStorage {
  private localStorage: Storage;

  constructor() {
    this.checkAvailability();
    this.localStorage = window.localStorage;
  }

  public setItem(key: string, value: string) {
    this.localStorage.setItem(key, value);
  }

  public getItem(key: string): any {
    const result = this.localStorage.getItem(key);
    try {
      if (result !== null) {
        return JSON.parse(result);
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  public removeItem(key: string) {
    this.localStorage.removeItem(key);
  }

  public key(key: number): string | null {
    return this.localStorage.key(key);
  }

  public length(): number {
    return this.localStorage.length;
  }

  public clear(): void {
    this.localStorage.clear();
  }

  public checkAvailability() {
    return DSUtils.storageAvailable('localStorage');
  }
}

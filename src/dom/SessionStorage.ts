/**
 * Class to save to cache info
 * @class SessionStorage
 * @desc A Storage class to save data into localStorage
 */
import { WebStorage } from '@/dom/WebStorage';
import { DSUtils } from '@/utils/DSUtils';

export class SessionStorage implements WebStorage {
  private sessionStorage: Storage;

  constructor() {
    this.checkAvailability();
    this.sessionStorage = window.sessionStorage;
  }

  public setItem(key: string, value: string) {
    this.sessionStorage.setItem(key, value);
  }

  public getItem(key: string): any {
    const result = this.sessionStorage.getItem(key);
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
    this.sessionStorage.removeItem(key);
  }

  public key(key: number): string | null {
    return this.sessionStorage.key(key);
  }

  public length(): number {
    return this.sessionStorage.length;
  }

  public clear(): void {
    this.sessionStorage.clear();
  }

  public checkAvailability() {
    return DSUtils.storageAvailable('sessionStorage');
  }
}

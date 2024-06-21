import { Injectable } from '@angular/core';
import { CurrentUserInterface } from '../../models/User/currentUser.interface';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  get(key: string): unknown {
    try {
      const localStorageItem = localStorage.getItem(key);
      return localStorageItem ? JSON.parse(localStorageItem) : null;
    } catch (e) {
      console.error('error saving to local Storage', e);
      return null;
    }
  }
  set(key: string, data: unknown): void {
    try {
      console.log(`Setting ${key}:`, data);
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('error saving to local Storage', e);
    }
  }
}

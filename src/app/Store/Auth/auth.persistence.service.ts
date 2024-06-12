import { Injectable } from '@angular/core';
import { CurrentUserInterface } from '../../models/User/currentUser.interface';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('error saving to local Storage', e);
    }
  }
  get(key: string): unknown {
    try {
      const localStorageItem = localStorage.getItem(key);
      return localStorageItem ? JSON.parse(localStorageItem) : null;
    } catch (e) {
      console.error('error saving to local Storage', e);
      return null;
    }
  }
}

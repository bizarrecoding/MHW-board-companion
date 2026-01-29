import { Persistence, ReactNativeAsyncStorage } from "firebase/auth";


/**
 * Inject Storage Dependency to Firebase
 * Mobile: AsyncStorage
 * Web: localStorage
 * 
 * copied interface non exported "PersistenceInternal" from firebase/auth
 * and adapted to handle localstorage
 */

enum PersistenceType {
  SESSION = "SESSION",
  LOCAL = "LOCAL",
  NONE = "NONE",
  COOKIE = "COOKIE"
}

type PersistedBlob = Record<string, unknown>;

type PersistenceValue = PersistedBlob | string;

interface StorageEventListener {
  (value: PersistenceValue | null): void;
}

interface PersistenceInternal extends Persistence {
  type: PersistenceType;
  _isAvailable(): Promise<boolean>;
  _set(key: string, value: PersistenceValue): Promise<void>;
  _get<T extends PersistenceValue>(key: string): Promise<T | null>;
  _remove(key: string): Promise<void>;
  _addListener(key: string, listener: StorageEventListener): void;
  _removeListener(key: string, listener: StorageEventListener): void;
  // Should this persistence allow migration up the chosen hierarchy?
  _shouldAllowMigration?: boolean;
}

const STORAGE_AVAILABLE_KEY = `__sak`;
export function getReactNativePersistence(storage: ReactNativeAsyncStorage): Persistence {
  return class implements PersistenceInternal {
    static type: `LOCAL` = `LOCAL`;
    readonly type: PersistenceType = PersistenceType.LOCAL;

    async _isAvailable(): Promise<boolean> {
      try {
        if (!storage) {
          return false;
        }
        await storage.setItem(STORAGE_AVAILABLE_KEY, `1`);
        await storage.removeItem(STORAGE_AVAILABLE_KEY);
        return true;
      } catch {
        return false;
      }
    }

    _set(key: string, value: PersistenceValue): Promise<void> {
      return storage.setItem(key, JSON.stringify(value));
    }

    async _get<T extends PersistenceValue>(key: string) {
      const json = await storage.getItem(key) as T;
      if (json) {
        if (typeof json === "string") {
          return JSON.parse(json);
        }
        return json;
      }
      return null
    }

    _remove(key: string): Promise<void> {
      return storage.removeItem(key);
    }

    _addListener(_key: string, _listener: any): void {
      // Listeners are not supported for React Native storage.
    }

    _removeListener(_key: string, _listener: any): void {
      // Listeners are not supported for React Native storage.
    }
  };
}

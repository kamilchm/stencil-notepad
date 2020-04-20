const storage = window.localStorage;

export function set(key: string, value: any): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      storage?.setItem(key, JSON.stringify(value));
      resolve();
    } catch (err) {
      reject(`Couldn't store object ${err}`);
    }
  });
}

export function remove(key: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      storage?.removeItem(key);
      resolve();
    } catch (err) {
      reject(`Couldn't remove object ${err}`);
    }
  });
}

export function get(key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      resolve(storage ? JSON.parse(storage.getItem(key)) : undefined);
    } catch (err) {
      reject(`Couldn't get object: ${err}`);
    }
  });
}

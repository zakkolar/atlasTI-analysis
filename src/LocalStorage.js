const ls = require('local-storage')
export const LocalStorage = {
  set (key, val) {
    ls(key, val)
  },
  get (key) {
    return ls(key);
  },
  remove (key) {
    ls.remove(key)
  }
};

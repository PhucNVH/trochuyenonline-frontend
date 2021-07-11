import * as StorageUtil from '../../utils/storage.util';

describe('Local Storage Test', () => {
  const key = 'test-key';
  afterEach(() => {
    localStorage.removeItem(key);
  });
  it('Save To Storage', () => {
    const value = 'test-value';
    StorageUtil.saveToStorage(key, value);
    expect(localStorage.getItem(key)).toEqual(value);
  });
  it('Remove From Storage', () => {
    const value = 'test-value';
    StorageUtil.saveToStorage(key, value);
    StorageUtil.removeFromStorage(key);
    expect(localStorage.getItem(key)).toBeNull();
  });
});

describe('Session Storage Test', () => {
  const key = 'test-key';
  afterEach(() => {
    sessionStorage.removeItem(key);
  });
  it('Save To Session Storage', () => {
    const value = 'test-value';
    StorageUtil.saveToSession(key, value);
    expect(sessionStorage.getItem(key)).toEqual(value);
  });
  it('Remove From Session Storage', () => {
    const value = 'test-value';
    StorageUtil.saveToSession(key, value);
    StorageUtil.removeFromSession(key);
    expect(sessionStorage.getItem(key)).toBeNull();
  });
});

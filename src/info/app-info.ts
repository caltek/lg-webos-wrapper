import type { AppInfo } from '../types';

/**
 * Get app information from appinfo.json
 * Wraps webOS.fetchAppInfo() method
 * @param path - Optional path to appinfo.json (defaults to "./appinfo.json")
 * @returns Promise resolving to app information
 */
export function getAppInfo(path?: string): Promise<AppInfo> {
  return new Promise((resolve, reject) => {
    if (!window.webOS?.fetchAppInfo) {
      reject(new Error('webOS.fetchAppInfo not available'));
      return;
    }

    try {
      window.webOS.fetchAppInfo((info: AppInfo) => {
        if (info && Object.keys(info).length > 0) {
          resolve(info);
        } else {
          reject(new Error('Failed to load app info'));
        }
      }, path);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Get the current app ID
 * Wraps webOS.fetchAppId() method
 * @returns App ID string or empty string if not available
 */
export function getAppId(): string {
  if (!window.webOS?.fetchAppId) {
    console.warn('webOS.fetchAppId not available');
    return '';
  }
  return window.webOS.fetchAppId();
}

/**
 * Get the app root path
 * Wraps webOS.fetchAppRootPath() method
 * @returns App root path string
 */
export function getAppRootPath(): string {
  if (!window.webOS?.fetchAppRootPath) {
    console.warn('webOS.fetchAppRootPath not available');
    return '';
  }
  return window.webOS.fetchAppRootPath();
}

/**
 * Get app title
 * @returns Promise resolving to app title
 */
export async function getAppTitle(): Promise<string> {
  const info = await getAppInfo();
  return info.title || 'Unknown App';
}

/**
 * Get app version
 * @returns Promise resolving to app version
 */
export async function getAppVersion(): Promise<string> {
  const info = await getAppInfo();
  return info.version || '0.0.0';
}

/**
 * Get app vendor
 * @returns Promise resolving to app vendor
 */
export async function getAppVendor(): Promise<string> {
  const info = await getAppInfo();
  return info.vendor || 'Unknown Vendor';
}


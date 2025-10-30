// Import and expose webOSTV.js
import './lib/webOSTV.js';

// Export services
export { ConnectionManager } from './services/connection-manager';
export { Database } from './services/database';

// Export device info utilities
export {
  getDeviceInfo,
  getModelName,
  getFirmwareVersion,
  getScreenResolution,
  isUHD,
  is8K,
  isOLED,
  supportsHDR10,
  supportsDolbyVision,
  supportsDolbyAtmos,
  getDeviceCapabilities,
} from './info/device-info';

// Export app info utilities
export {
  getAppInfo,
  getAppId,
  getAppRootPath,
  getAppTitle,
  getAppVersion,
  getAppVendor,
} from './info/app-info';

// Export all types
export type {
  // Base types
  LunaServiceResponse,
  LunaServiceRequest,
  LunaServiceError,
  LunaRequestHandle,
  
  // Connection Manager types
  ConnectionStatus,
  WiredConnectionInfo,
  WiFiConnectionInfo,
  WiFiDirectInfo,
  WANConnectionInfo,
  
  // Database types
  DatabaseKind,
  DatabaseIndex,
  DatabaseIndexProp,
  DatabaseQuery,
  PutKindResponse,
  FindResponse,
  PutRequest,
  PutResponse,
  DelRequest,
  DelResponse,
  GetRequest,
  GetResponse,
  
  // Info types
  DeviceInfo,
  AppInfo,
} from './types';

// Export webOS global for direct access if needed
export const webOS = window.webOS;


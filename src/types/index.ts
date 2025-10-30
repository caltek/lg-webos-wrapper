// Base Luna Service Types
export interface LunaServiceResponse {
  returnValue: boolean;
  errorCode?: number;
  errorText?: string;
}

export interface LunaServiceRequest {
  service: string;
  method: string;
  parameters?: Record<string, any>;
  onSuccess?: (response: any) => void;
  onFailure?: (error: LunaServiceError) => void;
  onComplete?: (response: any) => void;
  subscribe?: boolean;
  resubscribe?: boolean;
}

export interface LunaServiceError extends LunaServiceResponse {
  returnValue: false;
  errorCode: number;
  errorText: string;
}

export interface LunaRequestHandle {
  send: (request: LunaServiceRequest) => LunaRequestHandle;
  cancel: () => void;
}

// Connection Manager Types
export interface ConnectionStatus extends LunaServiceResponse {
  isInternetConnectionAvailable: boolean;
  wired?: WiredConnectionInfo;
  wifi?: WiFiConnectionInfo;
  wifiDirect?: WiFiDirectInfo;
  wan?: WANConnectionInfo;
}

export interface WiredConnectionInfo {
  state: string;
  interfaceName?: string;
  ipAddress?: string;
  netmask?: string;
  gateway?: string;
  dns1?: string;
  dns2?: string;
  method?: string;
  onInternet?: string;
}

export interface WiFiConnectionInfo {
  state: string;
  interfaceName?: string;
  ipAddress?: string;
  netmask?: string;
  gateway?: string;
  dns1?: string;
  dns2?: string;
  method?: string;
  ssid?: string;
  isWakeOnWiFiEnabled?: string;
  onInternet?: string;
}

export interface WiFiDirectInfo {
  state: string;
}

export interface WANConnectionInfo {
  state: string;
  interfaceName?: string;
  ipAddress?: string;
  netmask?: string;
  gateway?: string;
  dns1?: string;
  dns2?: string;
}

// Database Types
export interface DatabaseKind {
  id: string;
  owner: string;
  indexes?: DatabaseIndex[];
  schema?: Record<string, any>;
}

export interface DatabaseIndex {
  name: string;
  props: DatabaseIndexProp[];
}

export interface DatabaseIndexProp {
  name: string;
  type?: string;
  collate?: string;
  tokenize?: string;
  default?: any;
}

export interface PutKindResponse extends LunaServiceResponse {
  returnValue: true;
}

export interface DatabaseQuery {
  from: string;
  where?: Array<Record<string, any>>;
  orderBy?: string;
  desc?: boolean;
  limit?: number;
  page?: string;
  select?: string[];
}

export interface FindResponse extends LunaServiceResponse {
  returnValue: true;
  results: any[];
  next?: string;
  count?: number;
}

export interface PutRequest {
  objects: any[];
}

export interface PutResponse extends LunaServiceResponse {
  returnValue: true;
  results: Array<{ id: string; rev: number }>;
}

export interface DelRequest {
  ids?: string[];
  query?: DatabaseQuery;
}

export interface DelResponse extends LunaServiceResponse {
  returnValue: true;
  count: number;
}

export interface GetRequest {
  ids: string[];
}

export interface GetResponse extends LunaServiceResponse {
  returnValue: true;
  results: any[];
}

// Device Info Types
export interface DeviceInfo {
  modelName?: string;
  version?: string;
  versionMajor?: number;
  versionMinor?: number;
  versionDot?: number;
  sdkVersion?: string;
  screenWidth?: number;
  screenHeight?: number;
  uhd?: boolean;
  uhd8K?: boolean;
  oled?: boolean;
  ddrSize?: string;
  hdr10?: boolean;
  dolbyVision?: boolean;
  dolbyAtmos?: boolean;
  brandName?: string;
  manufacturer?: string;
  mainboardMaker?: string;
  platformBizType?: string;
  tuner?: boolean;
}

// App Info Types
export interface AppInfo {
  id?: string;
  version?: string;
  vendor?: string;
  title?: string;
  main?: string;
  icon?: string;
  type?: string;
  bgImage?: string;
  resolution?: string;
  largeIcon?: string;
  appDescription?: string;
  [key: string]: any;
}

// WebOS Global Interface
declare global {
  interface Window {
    webOS?: {
      service: {
        request: (service: string, params?: any) => LunaRequestHandle;
      };
      deviceInfo: (callback: (info: DeviceInfo) => void) => void;
      fetchAppInfo: (callback?: (info: AppInfo) => void, path?: string) => void;
      fetchAppId: () => string;
      fetchAppRootPath: () => string;
      platform: {
        tv?: boolean;
        watch?: boolean;
        legacy?: boolean;
        open?: boolean;
        unknown?: boolean;
        chrome?: number;
      };
      platformBack: () => void;
      keyboard: {
        isShowing: () => boolean;
      };
      systemInfo: () => {
        country?: string;
        smartServiceCountry?: string;
        timezone?: string;
      };
      libVersion: string;
    };
    PalmSystem?: any;
    PalmServiceBridge?: any;
  }
}

export {};


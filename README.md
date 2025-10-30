# webOS TV Wrapper Library

A TypeScript wrapper library for LG webOS TV Luna Services, providing type-safe access to Connection Manager, Database services, and device information APIs.

## Features

- 🎯 **Type-safe API** - Full TypeScript support with comprehensive type definitions
- 🔌 **Connection Manager** - Monitor internet connectivity and network status
- 💾 **Database Service** - Store and query persistent data using webOS DB8
- 📱 **Device Info** - Access device capabilities, model info, and screen specifications
- 📦 **App Info** - Retrieve application metadata
- 🌐 **Old Browser Support** - ES2015 target for compatibility with webOS 3.x+
- 📚 **Promise-based API** - Modern async/await patterns wrapping callback-based Luna services

## Installation

```bash
npm install @xstream/webos-tv-wrapper
```

## Usage

### Import the library

```typescript
import {
  ConnectionManager,
  Database,
  getDeviceInfo,
  getAppInfo,
} from '@xstream/webos-tv-wrapper';
```

### Connection Manager

Check internet connectivity:

```typescript
// Get current connection status
const status = await ConnectionManager.getStatus();
console.log('Internet available:', status.isInternetConnectionAvailable);

// Quick check
const isOnline = await ConnectionManager.isInternetAvailable();

// Subscribe to connection changes
const subscription = ConnectionManager.subscribeToStatus(
  (status) => {
    console.log('Connection changed:', status);
  },
  (error) => {
    console.error('Subscription error:', error);
  }
);

// Cancel subscription when done
subscription?.cancel();
```

### Database Service

Store and query persistent data:

```typescript
// Register a database kind (schema)
await Database.putKind({
  id: 'com.example.myapp:1',
  owner: 'com.example.myapp',
  indexes: [
    {
      name: 'name',
      props: [{ name: 'name' }],
    },
  ],
});

// Insert data
const result = await Database.put([
  { _kind: 'com.example.myapp:1', name: 'John', age: 30 },
  { _kind: 'com.example.myapp:1', name: 'Jane', age: 25 },
]);

// Query data
const found = await Database.find({
  from: 'com.example.myapp:1',
  where: [{ prop: 'age', op: '>', val: 20 }],
});
console.log('Results:', found.results);

// Watch for changes
const watcher = Database.watch(
  { from: 'com.example.myapp:1' },
  (results) => {
    console.log('Data changed:', results);
  }
);

// Delete by IDs
await Database.deleteByIds(['id1', 'id2']);

// Get by IDs
const records = await Database.get(['id1', 'id2']);
```

### Device Information

Access device capabilities and specs:

```typescript
// Get full device info
const deviceInfo = await getDeviceInfo();
console.log('Model:', deviceInfo.modelName);
console.log('Firmware:', deviceInfo.version);

// Quick access methods
const modelName = await getModelName();
const isUhd = await isUHD();
const isOled = await isOLED();
const supportsHdr = await supportsHDR10();
const supportsDv = await supportsDolbyVision();

// Get device capabilities summary
const capabilities = await getDeviceCapabilities();
console.log('Capabilities:', capabilities);
// { uhd: true, oled: false, hdr10: true, dolbyVision: true, ... }
```

### App Information

Access app metadata:

```typescript
// Get app info
const appInfo = await getAppInfo();
console.log('App:', appInfo.title, appInfo.version);

// Quick access
const appId = getAppId();
const rootPath = getAppRootPath();
const title = await getAppTitle();
const version = await getAppVersion();
```

## API Reference

### ConnectionManager

- `getStatus(subscribe?: boolean): Promise<ConnectionStatus>`
- `subscribeToStatus(callback, onError?): LunaRequestHandle | null`
- `isInternetAvailable(): Promise<boolean>`

### Database

- `putKind(kind: DatabaseKind): Promise<PutKindResponse>`
- `find(query: DatabaseQuery, subscribe?: boolean): Promise<FindResponse>`
- `watch(query, callback, onError?): LunaRequestHandle | null`
- `put(objects: any[]): Promise<PutResponse>`
- `del(request: DelRequest): Promise<DelResponse>`
- `get(ids: string[]): Promise<GetResponse>`
- `putKinds(kinds: DatabaseKind[]): Promise<PutKindResponse[]>`
- `deleteByIds(ids: string[]): Promise<DelResponse>`
- `deleteByQuery(query: DatabaseQuery): Promise<DelResponse>`

### Device Info

- `getDeviceInfo(): Promise<DeviceInfo>`
- `getModelName(): Promise<string>`
- `getFirmwareVersion(): Promise<string>`
- `getScreenResolution(): Promise<{ width, height }>`
- `isUHD(): Promise<boolean>`
- `is8K(): Promise<boolean>`
- `isOLED(): Promise<boolean>`
- `supportsHDR10(): Promise<boolean>`
- `supportsDolbyVision(): Promise<boolean>`
- `supportsDolbyAtmos(): Promise<boolean>`
- `getDeviceCapabilities(): Promise<object>`

### App Info

- `getAppInfo(path?: string): Promise<AppInfo>`
- `getAppId(): string`
- `getAppRootPath(): string`
- `getAppTitle(): Promise<string>`
- `getAppVersion(): Promise<string>`
- `getAppVendor(): Promise<string>`

## TypeScript Support

The library includes comprehensive TypeScript definitions. Import types as needed:

```typescript
import type {
  ConnectionStatus,
  DatabaseQuery,
  DeviceInfo,
  AppInfo,
  LunaServiceError,
} from '@xstream/webos-tv-wrapper';
```

## Browser Compatibility

This library is compiled to ES2015 (ES6) for compatibility with:
- webOS TV 3.x and later (2016+)
- Modern browsers
- Legacy TV platforms

## Building from Source

```bash
# Install dependencies
npm install

# Type check
npm run type-check

# Build library
npm run build

# Output: dist/webos-tv-wrapper.es.js (ESM)
#         dist/webos-tv-wrapper.umd.js (UMD)
#         dist/index.d.ts (TypeScript declarations)
```

## References

- [webOS TV Luna Service API](https://webostv.developer.lge.com/develop/references/luna-service-introduction)
- [Connection Manager API](https://webostv.developer.lge.com/develop/references/connection-manager)
- [Database API](https://webostv.developer.lge.com/develop/references/database)
- [webOSTV.js Library](https://webostv.developer.lge.com/develop/references/webostvjs-webos)

## License

MIT


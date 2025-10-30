/**
 * Example usage of the webOS TV Wrapper Library
 * This file demonstrates how to use the various services and utilities
 */

import {
  ConnectionManager,
  Database,
  getDeviceInfo,
  getAppInfo,
  getDeviceCapabilities,
  type ConnectionStatus,
  type DatabaseQuery,
} from './src/index';

// Example 1: Check Internet Connection
async function checkConnection() {
  try {
    // Simple check
    const isOnline = await ConnectionManager.isInternetAvailable();
    console.log('Internet available:', isOnline);

    // Detailed status
    const status: ConnectionStatus = await ConnectionManager.getStatus();
    console.log('Connection status:', status);

    // Subscribe to changes
    const subscription = ConnectionManager.subscribeToStatus(
      (status) => {
        console.log('Connection changed:', status.isInternetConnectionAvailable);
      },
      (error) => {
        console.error('Connection error:', error);
      }
    );

    // Cancel after 10 seconds
    setTimeout(() => subscription?.cancel(), 10000);
  } catch (error) {
    console.error('Failed to check connection:', error);
  }
}

// Example 2: Database Operations
async function databaseExample() {
  try {
    // Register a database kind (schema)
    await Database.putKind({
      id: 'com.example.app:1',
      owner: 'com.example.app',
      indexes: [
        {
          name: 'userId',
          props: [{ name: 'userId' }],
        },
        {
          name: 'createdAt',
          props: [{ name: 'createdAt' }],
        },
      ],
    });
    console.log('Database kind registered');

    // Insert data
    const insertResult = await Database.put([
      {
        _kind: 'com.example.app:1',
        userId: 'user123',
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: Date.now(),
      },
      {
        _kind: 'com.example.app:1',
        userId: 'user456',
        name: 'Jane Smith',
        email: 'jane@example.com',
        createdAt: Date.now(),
      },
    ]);
    console.log('Data inserted:', insertResult);

    // Query data
    const query: DatabaseQuery = {
      from: 'com.example.app:1',
      where: [
        {
          prop: 'userId',
          op: '=',
          val: 'user123',
        },
      ],
    };

    const results = await Database.find(query);
    console.log('Found records:', results.results);

    // Watch for changes
    const watcher = Database.watch(
      { from: 'com.example.app:1' },
      (results) => {
        console.log('Data changed:', results.results.length, 'records');
      },
      (error) => {
        console.error('Watch error:', error);
      }
    );

    // Clean up after some time
    setTimeout(() => watcher?.cancel(), 30000);
  } catch (error) {
    console.error('Database operation failed:', error);
  }
}

// Example 3: Device Information
async function deviceInfoExample() {
  try {
    // Get full device info
    const deviceInfo = await getDeviceInfo();
    console.log('Device:', {
      model: deviceInfo.modelName,
      firmware: deviceInfo.version,
      screen: `${deviceInfo.screenWidth}x${deviceInfo.screenHeight}`,
    });

    // Get capabilities
    const capabilities = await getDeviceCapabilities();
    console.log('Device capabilities:', capabilities);

    // Check specific features
    if (capabilities.uhd) {
      console.log('This is a UHD TV');
    }
    if (capabilities.oled) {
      console.log('This is an OLED TV');
    }
    if (capabilities.dolbyVision) {
      console.log('Supports Dolby Vision');
    }
  } catch (error) {
    console.error('Failed to get device info:', error);
  }
}

// Example 4: App Information
async function appInfoExample() {
  try {
    const appInfo = await getAppInfo();
    console.log('App:', {
      title: appInfo.title,
      version: appInfo.version,
      vendor: appInfo.vendor,
    });
  } catch (error) {
    console.error('Failed to get app info:', error);
  }
}

// Run examples (in a webOS TV environment)
if (typeof window !== 'undefined' && window.webOS) {
  console.log('Running on webOS TV');
  
  // Run examples sequentially
  (async () => {
    await checkConnection();
    await databaseExample();
    await deviceInfoExample();
    await appInfoExample();
  })();
} else {
  console.log('Not running on webOS TV - examples skipped');
}

export {
  checkConnection,
  databaseExample,
  deviceInfoExample,
  appInfoExample,
};


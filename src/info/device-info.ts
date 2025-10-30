import type { DeviceInfo } from '../types';

/**
 * Get webOS TV device information
 * Wraps webOS.deviceInfo() method
 * @returns Promise resolving to device information
 */
export function getDeviceInfo(): Promise<DeviceInfo> {
  return new Promise((resolve, reject) => {
    if (!window.webOS?.deviceInfo) {
      reject(new Error('webOS.deviceInfo not available'));
      return;
    }

    try {
      window.webOS.deviceInfo((info: DeviceInfo) => {
        resolve(info);
      });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Get device model name
 * @returns Promise resolving to model name
 */
export async function getModelName(): Promise<string> {
  const info = await getDeviceInfo();
  return info.modelName || 'Unknown';
}

/**
 * Get device firmware version
 * @returns Promise resolving to version string
 */
export async function getFirmwareVersion(): Promise<string> {
  const info = await getDeviceInfo();
  return info.version || '0.0.0';
}

/**
 * Get screen resolution
 * @returns Promise resolving to { width, height }
 */
export async function getScreenResolution(): Promise<{ width: number; height: number }> {
  const info = await getDeviceInfo();
  return {
    width: info.screenWidth || 1920,
    height: info.screenHeight || 1080,
  };
}

/**
 * Check if device supports UHD
 * @returns Promise resolving to boolean
 */
export async function isUHD(): Promise<boolean> {
  const info = await getDeviceInfo();
  return info.uhd || false;
}

/**
 * Check if device supports 8K
 * @returns Promise resolving to boolean
 */
export async function is8K(): Promise<boolean> {
  const info = await getDeviceInfo();
  return info.uhd8K || false;
}

/**
 * Check if device is OLED
 * @returns Promise resolving to boolean
 */
export async function isOLED(): Promise<boolean> {
  const info = await getDeviceInfo();
  return info.oled || false;
}

/**
 * Check if device supports HDR10
 * @returns Promise resolving to boolean
 */
export async function supportsHDR10(): Promise<boolean> {
  const info = await getDeviceInfo();
  return info.hdr10 || false;
}

/**
 * Check if device supports Dolby Vision
 * @returns Promise resolving to boolean
 */
export async function supportsDolbyVision(): Promise<boolean> {
  const info = await getDeviceInfo();
  return info.dolbyVision || false;
}

/**
 * Check if device supports Dolby Atmos
 * @returns Promise resolving to boolean
 */
export async function supportsDolbyAtmos(): Promise<boolean> {
  const info = await getDeviceInfo();
  return info.dolbyAtmos || false;
}

/**
 * Get device capabilities summary
 * @returns Promise resolving to capabilities object
 */
export async function getDeviceCapabilities() {
  const info = await getDeviceInfo();
  return {
    uhd: info.uhd || false,
    uhd8K: info.uhd8K || false,
    oled: info.oled || false,
    hdr10: info.hdr10 || false,
    dolbyVision: info.dolbyVision || false,
    dolbyAtmos: info.dolbyAtmos || false,
    tuner: info.tuner !== false,
  };
}


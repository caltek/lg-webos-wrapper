import type {
  ConnectionStatus,
  LunaServiceError,
  LunaRequestHandle,
} from '../types';

/**
 * Connection Manager Service
 * Provides access to webOS Connection Manager Luna Service
 * Service URI: luna://com.webos.service.connectionmanager
 */
export class ConnectionManager {
  private static readonly SERVICE_URI = 'luna://com.webos.service.connectionmanager';

  /**
   * Get the current internet connection status
   * @param subscribe - If true, subscribes to connection status changes
   * @returns Promise resolving to connection status
   */
  static getStatus(subscribe: boolean = false): Promise<ConnectionStatus> {
    return new Promise((resolve, reject) => {
      if (!window.webOS?.service) {
        reject({
          returnValue: false,
          errorCode: -1,
          errorText: 'webOS service not available',
        } as LunaServiceError);
        return;
      }

      const request: LunaRequestHandle = window.webOS.service.request(
        this.SERVICE_URI,
        {
          method: 'getStatus',
          parameters: {
            subscribe,
          },
          onSuccess: (response: ConnectionStatus) => {
            resolve(response);
          },
          onFailure: (error: LunaServiceError) => {
            reject(error);
          },
        }
      );

      // Return the request handle for potential cancellation
      return request;
    });
  }

  /**
   * Subscribe to connection status changes
   * @param callback - Callback function called on each status update
   * @returns Request handle that can be used to cancel the subscription
   */
  static subscribeToStatus(
    callback: (status: ConnectionStatus) => void,
    onError?: (error: LunaServiceError) => void
  ): LunaRequestHandle | null {
    if (!window.webOS?.service) {
      const error: LunaServiceError = {
        returnValue: false,
        errorCode: -1,
        errorText: 'webOS service not available',
      };
      onError?.(error);
      return null;
    }

    return window.webOS.service.request(this.SERVICE_URI, {
      method: 'getStatus',
      parameters: {
        subscribe: true,
      },
      onSuccess: callback,
      onFailure: onError,
    });
  }

  /**
   * Check if internet connection is available
   * @returns Promise resolving to boolean indicating internet availability
   */
  static async isInternetAvailable(): Promise<boolean> {
    try {
      const status = await this.getStatus(false);
      return status.isInternetConnectionAvailable;
    } catch (error) {
      console.error('Failed to check internet availability:', error);
      return false;
    }
  }
}


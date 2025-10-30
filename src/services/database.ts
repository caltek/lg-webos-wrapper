import type {
  DatabaseKind,
  DatabaseQuery,
  DelRequest,
  DelResponse,
  FindResponse,
  GetRequest,
  GetResponse,
  LunaRequestHandle,
  LunaServiceError,
  PutKindResponse,
  PutRequest,
  PutResponse,
} from '../types';

/**
 * Database Service
 * Provides access to webOS Database (DB8) Luna Service
 * Service URI: luna://com.webos.service.db
 */
export class Database {
  private static readonly SERVICE_URI = 'luna://com.webos.service.db';

  /**
   * Register a database kind (schema)
   * @param kind - Database kind definition
   * @returns Promise resolving when kind is registered
   */
  static putKind(kind: DatabaseKind): Promise<PutKindResponse> {
    return new Promise((resolve, reject) => {
      if (!window.webOS?.service) {
        reject({
          returnValue: false,
          errorCode: -1,
          errorText: 'webOS service not available',
        } as LunaServiceError);
        return;
      }

      window.webOS.service.request(this.SERVICE_URI, {
        method: 'putKind',
        parameters: kind,
        onSuccess: (response: PutKindResponse) => {
          resolve(response);
        },
        onFailure: (error: LunaServiceError) => {
          reject(error);
        },
      });
    });
  }

  /**
   * Query the database
   * @param query - Database query
   * @param subscribe - If true, subscribes to query result changes
   * @returns Promise resolving to query results
   */
  static find(query: DatabaseQuery, subscribe: boolean = false): Promise<FindResponse> {
    return new Promise((resolve, reject) => {
      if (!window.webOS?.service) {
        reject({
          returnValue: false,
          errorCode: -1,
          errorText: 'webOS service not available',
        } as LunaServiceError);
        return;
      }

      window.webOS.service.request(this.SERVICE_URI, {
        method: 'find',
        parameters: {
          query,
          subscribe,
        },
        onSuccess: (response: FindResponse) => {
          resolve(response);
        },
        onFailure: (error: LunaServiceError) => {
          reject(error);
        },
      });
    });
  }

  /**
   * Subscribe to database query changes
   * @param query - Database query to watch
   * @param callback - Callback function called when results change
   * @param onError - Error callback
   * @returns Request handle that can be used to cancel the subscription
   */
  static watch(
    query: DatabaseQuery,
    callback: (results: FindResponse) => void,
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
      method: 'find',
      parameters: {
        query,
        subscribe: true,
      },
      onSuccess: callback,
      onFailure: onError,
    });
  }

  /**
   * Insert or update database records
   * @param objects - Array of objects to insert/update
   * @returns Promise resolving to put results
   */
  static put(objects: any[]): Promise<PutResponse> {
    return new Promise((resolve, reject) => {
      if (!window.webOS?.service) {
        reject({
          returnValue: false,
          errorCode: -1,
          errorText: 'webOS service not available',
        } as LunaServiceError);
        return;
      }

      const request: PutRequest = { objects };

      window.webOS.service.request(this.SERVICE_URI, {
        method: 'put',
        parameters: request,
        onSuccess: (response: PutResponse) => {
          resolve(response);
        },
        onFailure: (error: LunaServiceError) => {
          reject(error);
        },
      });
    });
  }

  /**
   * Delete database records
   * @param request - Delete request with either ids or query
   * @returns Promise resolving to delete results
   */
  static del(request: DelRequest): Promise<DelResponse> {
    return new Promise((resolve, reject) => {
      if (!window.webOS?.service) {
        reject({
          returnValue: false,
          errorCode: -1,
          errorText: 'webOS service not available',
        } as LunaServiceError);
        return;
      }

      window.webOS.service.request(this.SERVICE_URI, {
        method: 'del',
        parameters: request,
        onSuccess: (response: DelResponse) => {
          resolve(response);
        },
        onFailure: (error: LunaServiceError) => {
          reject(error);
        },
      });
    });
  }

  /**
   * Get database records by IDs
   * @param ids - Array of record IDs to retrieve
   * @returns Promise resolving to retrieved records
   */
  static get(ids: string[]): Promise<GetResponse> {
    return new Promise((resolve, reject) => {
      if (!window.webOS?.service) {
        reject({
          returnValue: false,
          errorCode: -1,
          errorText: 'webOS service not available',
        } as LunaServiceError);
        return;
      }

      const request: GetRequest = { ids };

      window.webOS.service.request(this.SERVICE_URI, {
        method: 'get',
        parameters: request,
        onSuccess: (response: GetResponse) => {
          resolve(response);
        },
        onFailure: (error: LunaServiceError) => {
          reject(error);
        },
      });
    });
  }

  /**
   * Batch operations - put multiple kinds at once
   * @param kinds - Array of database kind definitions
   * @returns Promise resolving when all kinds are registered
   */
  static async putKinds(kinds: DatabaseKind[]): Promise<PutKindResponse[]> {
    const promises = kinds.map((kind) => this.putKind(kind));
    return Promise.all(promises);
  }

  /**
   * Delete records by IDs
   * @param ids - Array of record IDs to delete
   * @returns Promise resolving to delete results
   */
  static deleteByIds(ids: string[]): Promise<DelResponse> {
    return this.del({ ids });
  }

  /**
   * Delete records matching a query
   * @param query - Query to match records for deletion
   * @returns Promise resolving to delete results
   */
  static deleteByQuery(query: DatabaseQuery): Promise<DelResponse> {
    return this.del({ query });
  }
}


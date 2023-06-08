import { StorageOption } from '../types';

export interface StorageModuleOptions {
  provider: 's3' | 'local' | 'gcs' | 'azure' | 'r2';
  options: StorageOption;
}


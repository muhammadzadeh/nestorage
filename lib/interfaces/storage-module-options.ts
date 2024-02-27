import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { StorageOption } from '../types';

export interface StorageModuleOptions {
  provider: 's3' | 'local' | 'gcs' | 'azure' | 'r2';
  options: StorageOption;
}

export interface AsyncStorageModuleOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => Promise<StorageModuleOptions> | StorageModuleOptions;
  inject?: FactoryProvider['inject'];
}


import {
  DynamicModule,
  Global,
  Inject,
  Module,
  Provider,
} from '@nestjs/common';

import { ModuleRef } from '@nestjs/core';
import { StorageModuleOptions } from './interfaces';
import {
  AzureStorageProvider,
  GCloudStorageProvider,
  LocalStorageProvider,
  R2StorageProvider,
  S3StorageProvider,
} from './providers';
import { STORAGE_MODULE_OPTIONS, STORAGE_TOKEN } from './storage.constants';
import { StorageService } from './storage.service';
import {
  AzureStorageOption,
  GCloudStorageOption,
  LocalStorageOption,
  R2StorageOption,
  S3StorageOption,
} from './types';

@Global()
@Module({})
export class StorageCoreModule {
  constructor(
    @Inject(STORAGE_MODULE_OPTIONS)
    private readonly options: StorageModuleOptions,
    private readonly moduleRef: ModuleRef,
  ) {}

  static forRoot(options: StorageModuleOptions): DynamicModule {
    const storageModuleOptions: Provider = {
      provide: STORAGE_MODULE_OPTIONS,
      useValue: options,
    };
    const storageProvider: Provider = {
      provide: STORAGE_TOKEN,
      useValue: this.registerProvider(options),
    };

    return {
      module: StorageCoreModule,
      providers: [storageModuleOptions, storageProvider, StorageService],
      exports: [StorageService],
    };
  }

  private static registerProvider(options: StorageModuleOptions) {
    switch (options.provider) {
      case 'local':
        return new LocalStorageProvider(options.options as LocalStorageOption);

      case 'gcs':
        return new GCloudStorageProvider(
          options.options as GCloudStorageOption,
        );

      case 'azure':
        return new AzureStorageProvider(options.options as AzureStorageOption);

      case 's3':
        return new S3StorageProvider(options.options as S3StorageOption);

      case 'r2':
        return new R2StorageProvider(options.options as R2StorageOption);

      default:
        return new LocalStorageProvider(options.options as LocalStorageOption);
    }
  }
}


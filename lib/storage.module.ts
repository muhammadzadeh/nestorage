import { DynamicModule, Module, Provider } from '@nestjs/common';

import { AsyncStorageModuleOptions, StorageModuleOptions } from './interfaces';
import { GCloudStorageProvider, LocalStorageProvider } from './providers';
import { StorageService } from './services';
import { STORAGE_MODULE_OPTIONS, STORAGE_TOKEN } from './storage.constants';
import { GCloudStorageOption, LocalStorageOption } from './types';

import {
  AzureStorageProvider,
  R2StorageProvider,
  S3StorageProvider,
} from './providers';
import { AzureStorageOption, R2StorageOption, S3StorageOption } from './types';

@Module({})
export class StorageModule {
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
      module: StorageModule,
      providers: [storageModuleOptions, storageProvider, StorageService],
      exports: [StorageService],
    };
  }

  static forRootAsync(options: AsyncStorageModuleOptions): DynamicModule {
    return {
      module: StorageModule,
      imports: options.imports,
      global: true,
      providers: [
        {
          provide: STORAGE_MODULE_OPTIONS,
          useFactory: options.useFactory,
        },
        {
          provide: STORAGE_TOKEN,
          useFactory: options.useFactory,
        },
        StorageService,
      ],
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


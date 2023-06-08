import { DynamicModule, Module } from '@nestjs/common';

import { StorageModuleOptions } from './interfaces';
import { StorageCoreModule } from './storage-core.module';

@Module({})
export class StorageModule {
  static forRoot(options: StorageModuleOptions): DynamicModule {
    return {
      module: StorageModule,
      imports: [StorageCoreModule.forRoot(options)],
    };
  }
}


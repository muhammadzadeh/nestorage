import { Inject, Injectable } from '@nestjs/common';

import { IStorageProvider } from '../providers';
import { STORAGE_TOKEN } from '../storage.constants';

@Injectable()
export class StorageService {
  constructor(
    @Inject(STORAGE_TOKEN) private readonly storageProvider: IStorageProvider,
  ) {}

  getProviderName(): string {
    return this.storageProvider.getName();
  }

  async putObject(
    path: string,
    file: string,
    data: Buffer,
    bucket: string,
  ): Promise<void> {
    await this.storageProvider.putObject(path, file, data, bucket);
  }

  async getObject(path: string, bucket: string): Promise<Buffer> {
    return await this.storageProvider.getObject(path, bucket);
  }
}


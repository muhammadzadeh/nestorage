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
    bucket: string,
    path: string,
    fileName: string,
    data: Buffer,
  ): Promise<void> {
    await this.storageProvider.putObject(bucket, path, fileName, data);
  }

  async getObject(bucket: string, path: string, fileName: string): Promise<Buffer> {
    return await this.storageProvider.getObject(bucket, path, fileName);
  }
}


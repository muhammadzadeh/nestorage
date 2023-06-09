import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { GCloudStorageOption } from '../types';
import { IStorageProvider } from './base';

@Injectable()
export class GCloudStorageProvider implements IStorageProvider {
  private readonly storage: Storage;

  constructor(private readonly options: GCloudStorageOption) {
    this.storage = new Storage({
      keyFilename: options.keyFilename,
    });
  }

  getName(): string {
    return 'gcs';
  }

  async putObject(
    bucket: string,
    path: string,
    fileName: string,
    data: Buffer,
  ): Promise<void> {
    const created_file = this.storage
      .bucket(bucket)
      .file(`${path}/${fileName}`);
    await created_file.save(data);
  }

  async getObject(
    bucket: string,
    path: string,
    fileName: string,
  ): Promise<Buffer> {
    const file = this.storage.bucket(bucket).file(`${path}/${fileName}`);
    const [content] = await file.download();
    return content;
  }
}


import { Injectable } from '@nestjs/common';
import { GCloudStorageOption } from '../types';
import { IStorageProvider } from './base';
import { Storage } from '@google-cloud/storage';


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

  async upload(
    path: string,
    file: string,
    data: Buffer,
    bucket: string,
  ): Promise<void> {
    const created_file = this.storage.bucket(bucket).file(`${path}/${file}`);
    await created_file.save(data);
  }

  async getObject(path: string, bucket: string): Promise<Buffer> {
    const file = this.storage.bucket(bucket).file(path);
    const [content] = await file.download();
    return content;
  }
}


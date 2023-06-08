import { Injectable } from '@nestjs/common';
import { GcCloudStorageOption } from '../types';
import { IStorageProvider } from './base';
import { Storage } from '@google-cloud/storage';


@Injectable()
export class GcCloudStorageProvider implements IStorageProvider {
  private readonly storage: Storage;

  constructor(private readonly options: GcCloudStorageOption) {
    this.storage = new Storage({
      keyFilename: options.keyFilename,
    });
  }

  getName(): string {
    return 'gcloud';
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

  async download(path: string, bucket: string): Promise<Buffer> {
    const file = this.storage.bucket(bucket).file(path);
    const [content] = await file.download();
    return content;
  }
}


/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BlobServiceClient } from '@azure/storage-blob';
import { Injectable } from '@nestjs/common';
import { AzureStorageOption } from '../types';
import { IStorageProvider } from './base';

@Injectable()
export class AzureStorageProvider implements IStorageProvider {
  private readonly storage: BlobServiceClient;

  constructor(private readonly options: AzureStorageOption) {
    this.storage = BlobServiceClient.fromConnectionString(
      options.connectionString,
    );
  }

  getName(): string {
    return 'azure';
  }

  async upload(
    path: string,
    file: string,
    data: Buffer,
    bucket: string,
  ): Promise<void> {
    const storage = this.storage.getContainerClient(bucket);
    const blockBlobClient = storage.getBlockBlobClient(`${path}/${file}`);
    await blockBlobClient.upload(data, data.length);
  }

  async streamToBuffer(readableStream: any): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Uint8Array[] | Buffer[] = [];
      readableStream.on(
        'data',
        (data: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>) => {
          chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        },
      );
      readableStream.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on('error', reject);
    });
  }

  async download(path: string, bucket: string): Promise<Buffer> {
    const storage = this.storage.getContainerClient(bucket);
    const blockBlobClient = storage.getBlockBlobClient(path);
    const file = await blockBlobClient.download();
    const downloaded = await this.streamToBuffer(file.readableStreamBody);
    return downloaded;
  }
}


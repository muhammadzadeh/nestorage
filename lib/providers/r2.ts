import {
  GetObjectCommand,
  GetObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { R2StorageOption } from '../types';
import { streamToBuffer } from '../utils';
import { IStorageProvider } from './base';

@Injectable()
export class R2StorageProvider implements IStorageProvider {
  private readonly storage: S3Client;

  constructor(private readonly options: R2StorageOption) {
    this.storage = new S3Client({
      region: options.region,
      endpoint: options!.endpoint,
      credentials: {
        accessKeyId: options!.accessKeyId,
        secretAccessKey: options!.secretAccessKey,
      },
    });
  }

  getName(): string {
    return 'r2';
  }

  async putObject(
    bucket: string,
    path: string,
    fileName: string,
    data: Buffer,
  ): Promise<void> {
    const params: PutObjectCommandInput = {
      Bucket: bucket,
      Key: `${path}/${fileName}`,
      Body: data,
    };
    await this.storage.send(new PutObjectCommand(params));
  }

  async getObject(
    bucket: string,
    path: string,
    fileName: string,
  ): Promise<Buffer> {
    const params: GetObjectCommandInput = {
      Bucket: bucket,
      Key: `${path}/${fileName}`,
    };
    const response = await this.storage.send(new GetObjectCommand(params));

    return await streamToBuffer(response.Body as Readable);
  }
}


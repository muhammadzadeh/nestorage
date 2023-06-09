import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';
import { R2StorageOption } from '../types';
import { IStorageProvider } from './base';

@Injectable()
export class R2StorageProvider implements IStorageProvider {
  private readonly storage: aws.S3;

  constructor(private readonly options: R2StorageOption) {
    this.storage = new aws.S3({
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.secretAccessKey,
      endpoint: options.endpoint,
      s3ForcePathStyle: true,
    });
  }

  getName(): string {
    return 'r2';
  }

  async createBucket(bucket: string): Promise<void> {
    const params = {
      Bucket: bucket,
      region: this.options.region,
    };
    await this.storage.createBucket(params).promise();
  }

  async putObject(
    bucket: string,
    path: string,
    fileName: string,
    data: Buffer,
  ): Promise<void> {
    const params = {
      Bucket: bucket,
      Key: `${path}/${fileName}`,
      Body: data,
    };
    await this.createBucket(bucket);
    await this.storage.upload(params).promise();
  }

  async getObject(
    bucket: string,
    path: string,
    fileName: string,
  ): Promise<Buffer> {
    const params = {
      Bucket: bucket,
      Key: `${path}/${fileName}`,
    };

    const file = await this.storage.getObject(params).promise();
    return file.Body! as Buffer;
  }
}


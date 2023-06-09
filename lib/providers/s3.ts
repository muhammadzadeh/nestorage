import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';
import { S3StorageOption } from '../types';
import { IStorageProvider } from './base';

@Injectable()
export class S3StorageProvider implements IStorageProvider {
  private readonly storage: aws.S3;

  constructor(private readonly options: S3StorageOption) {
    this.storage = new aws.S3({
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.secretAccessKey,
      endpoint: options.endpoint,
      s3ForcePathStyle: true,
    });
  }

  getName(): string {
    return 's3';
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


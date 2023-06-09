import { Injectable } from '@nestjs/common';
import fs from 'node:fs/promises';
import { LocalStorageOption } from '../types';
import { IStorageProvider } from './base';

@Injectable()
export class LocalStorageProvider implements IStorageProvider {
  constructor(private readonly options: LocalStorageOption) {}

  getName(): string {
    return 'local';
  }

  async putObject(
    bucket: string,
    path: string,
    fileName: string,
    data: Buffer,
  ): Promise<void> {
    await fs.mkdir(`${this.options.root}/${bucket}/${path}`, {
      recursive: true,
    });
    await fs.writeFile(
      `${this.options.root}/${bucket}/${path}/${fileName}`,
      data,
    );
  }

  getObject(bucket: string, path: string, fileName: string): Promise<Buffer> {
    return fs.readFile(`${this.options.root}/${bucket}/${path}/${fileName}`);
  }
}


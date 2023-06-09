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

  async upload(path: string, file: string, data: Buffer,  bucket: string,): Promise<void> {
    await fs.mkdir(path, { recursive: true });
    await fs.writeFile(`${this.options.root}/${bucket}/${path}/${file}`, data);
  }

  getObject(path: string,  bucket: string,): Promise<Buffer> {
    return fs.readFile(`${this.options.root}/${bucket}/${path}`);
  }

}


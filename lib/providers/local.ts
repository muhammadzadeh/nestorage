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

  async upload(path: string, file: string, data: Buffer): Promise<void> {
    await fs.mkdir(path, { recursive: true });
    await fs.writeFile(`${path}/${file}`, data);
  }

  download(path: string): Promise<Buffer> {
    return fs.readFile(path);
  }

  async delete(path: string, file: string): Promise<void> {
    const files = await fs.readdir(path);
    await Promise.all(files.filter(f => f.includes(file)).map(f => fs.rm(f)));
  }
}


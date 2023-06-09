export interface IStorageProvider {
  putObject(
    bucket: string,
    path: string,
    fileName: string,
    data: Buffer,
  ): Promise<void>;

  getObject(bucket: string, path: string, fileName: string): Promise<Buffer>;

  getName(): string;
}

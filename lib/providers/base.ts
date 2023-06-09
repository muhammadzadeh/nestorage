export interface IStorageProvider{
    putObject(
        path: string,
        file: string,
        data: Buffer,
        bucket: string,
      ): Promise<void>;
    
      getObject(path: string, bucket: string): Promise<Buffer>;
    
      getName(): string;
}
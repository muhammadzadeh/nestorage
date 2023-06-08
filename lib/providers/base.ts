export interface IStorageProvider{
    upload(
        path: string,
        file: string,
        data: Buffer,
        bucket: string,
      ): Promise<void>;
    
      download(path: string, bucket: string): Promise<Buffer>;
    
      getName(): string;
}
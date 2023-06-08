export interface IStorageProvider{
    upload(
        path: string,
        file: string,
        data: Buffer,
      ): Promise<void>;
    
      download(path: string): Promise<Buffer>;
    
      delete(path: string, file: string,): Promise<void>;
    
      getName(): string;
}
export type StorageOption =
  | LocalStorageOption
  | S3StorageOption
  | R2StorageOption
  | AzureStorageOption
  | GCloudStorageOption;

export type LocalStorageOption = {
  root: string;
};

export type S3StorageOption = {
  accessKeyId: string;
  endpoint: string;
  secretAccessKey: string;
  region: string;
};

export type R2StorageOption = {
  accessKeyId: string;
  endpoint: string;
  secretAccessKey: string;
  region: string;
};

export type GCloudStorageOption = {
  keyFilename: string;
};

export type AzureStorageOption = {
  connectionString: string;
};

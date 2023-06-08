export type StorageOption =
  | LocalStorageOption
  | S3StorageOption
  | GcCloudStorageOption;

export type LocalStorageOption = {
  root: string;
};

export type S3StorageOption = {
  key: string;
  endpoint: string;
  secret: string;
  bucket: string;
  region: string;
};

export type GcCloudStorageOption = {
  keyFilename: string;
  bucket: string;
};

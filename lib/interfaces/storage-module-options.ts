import {
  StorageOption,
  GcCloudStorageOption,
  LocalStorageOption,
  S3StorageOption,
  DiskType,
  DriverType,
} from '../types';

export interface StorageModuleOptions {
  default: string;
  disks: Record<string, DiskType>;
}

export interface StorageDiskConfig {
  driver: DriverType | string;
  config: StorageOption;
}

export interface AwsS3StorageDisk extends StorageDiskConfig {
  driver: DriverType.S3 | 's3';
  config: S3StorageOption;
}

export interface LocalStorageDisk extends StorageDiskConfig {
  driver: DriverType.LOCAL | 'local';
  config: LocalStorageOption;
}

export interface GoogleGcsStorageDisk extends StorageDiskConfig {
  driver: DriverType.GCS | 'gcs';
  config: GcCloudStorageOption;
}


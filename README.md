<p  align="center">

<a  href="http://nestjs.com/"  target="blank"><img  src="https://github-production-user-asset-6210df.s3.amazonaws.com/10474363/244793096-79f1d323-1808-4838-a0e1-cd5e23b18f91.svg"  width="500"  alt="Nestorage Logo"  /></a>

</p>

<p  align="center">

NestJS Storage module, work with famous object storage like S3, R2, Azure, Google Cloud

</p>

## Installation

```bash
npm i --save @muhammadzadeh/nestorage
```

## How To

- select your preferred provider and provide its configs
  - [local](#local-example)
  - [s3](#s3-example)
  - [r2](#r2-example)
  - [azure](#azure-example)
  - [gcs](#google-cloud-example)
- inject StorageService
  - [StorageService](#storageservice)

### Local Storage Example

```typescript
// app.module.ts

import { Module } from '@nestjs/common';

import { StorageModule } from '@muhammadzadeh/nestorage';

@Module({
  imports: [
    StorageModule.forRoot({
      provider: 'local',
      options: {
        root: 'ROOT_DIR',
      },
    }),
  ],
})
export class AppModule {}
```

### S3 Storage Example

```typescript
// app.module.ts

import { Module } from '@nestjs/common';

import { StorageModule } from '@muhammadzadeh/nestorage';

@Module({
  imports: [
    StorageModule.forRoot({
      provider: 's3',
      options: {
        accessKeyId: 'ACCESS_KEY_ID',
        secretAccessKey: 'SECRET_ACCESS_KEY',
        endpoint: 'S3_ENDPOINT',
        region: 'auto',
      },
    }),
  ],
})
export class AppModule {}
```

### R2 Storage Example

```typescript
// app.module.ts

import { Module } from '@nestjs/common';

import { StorageModule } from '@muhammadzadeh/nestorage';

@Module({
  imports: [
    StorageModule.forRoot({
      provider: 'r2',
      options: {
        accessKeyId: 'ACCESS_KEY_ID',
        secretAccessKey: 'SECRET_ACCESS_KEY',
        endpoint: 'CLOUDFLARE_R2_EXAMPLE',
        region: 'auto',
      },
    }),
  ],
})
export class AppModule {}
```

### Azure Storage Example

```typescript
// app.module.ts

import { Module } from '@nestjs/common';

import { StorageModule } from '@muhammadzadeh/nestorage';

@Module({
  imports: [
    StorageModule.forRoot({
      provider: 'azure',
      options: {
        connectionString: 'CONNECTION_STRING ',
      },
    }),
  ],
})
export class AppModule {}
```

### Google Cloud Storage Example

```typescript
// app.module.ts

import { Module } from '@nestjs/common';

import { StorageModule } from '@muhammadzadeh/nestorage';

@Module({
  imports: [
    StorageModule.forRoot({
      provider: 'gcs',
      options: {
        keyFilename: 'GOOGLE_KEY_FILE_NAME',
      },
    }),
  ],
})
export class AppModule {}
```

### StorageService

```typescript
import { Injectable } from '@nestjs/common';

import { StorageService } from '@muhammadzadeh/nestorage';

@Injectable()
export class MyClass {
  constructor(private readonly storage: StorageService) {}
}
```

## Support

nestorage is an MIT-licensed open source project. If this library is helpful, please click star to support it.

## License

nestorage is MIT licensed.

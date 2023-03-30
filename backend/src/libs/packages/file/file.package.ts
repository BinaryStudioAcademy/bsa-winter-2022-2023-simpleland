import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { type IConfig } from '~/libs/packages/config/config.js';

class File {
  private storage: S3Client;

  private config: IConfig;

  public constructor(config: IConfig) {
    this.config = config;

    const { AWS_ACCESS_KEY, AWS_REGION, AWS_SECRET_ACCESS_KEY } =
      this.config.ENV.AWS;

    this.storage = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  public async upload({
    file,
    fileName,
  }: {
    file: Buffer;
    fileName: string;
  }): Promise<string> {
    const { AWS_BUCKET_NAME } = this.config.ENV.AWS;

    const command = new PutObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: fileName,
      Body: file,
    });

    await this.storage.send(command);

    return this.getFileUrl(fileName);
  }

  private getFileUrl(fileName: string): string {
    const { AWS_BUCKET_NAME } = this.config.ENV.AWS;

    return `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
  }
}

export { File };

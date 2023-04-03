import crypto from 'node:crypto';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { type IConfig } from '~/libs/packages/config/config.js';

import { FileEntity } from './file.entity.js';
import { type FileRepository } from './file.repository.js';

type Constructor = {
  config: IConfig;
  fileRepository: FileRepository;
};

class File {
  private storage: S3Client;

  private fileRepository: FileRepository;

  private config: IConfig;

  public constructor({ config, fileRepository }: Constructor) {
    this.fileRepository = fileRepository;
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
  }: {
    file: Buffer | string;
  }): Promise<{ id: number; url: string }> {
    const { AWS_BUCKET_NAME } = this.config.ENV.AWS;
    const fileName = crypto.randomUUID();

    const command = new PutObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: fileName,
      Body: typeof file === 'string' ? this.getBufferFromBase64(file) : file,
    });

    await this.storage.send(command);

    const url = this.getFileUrl(fileName);

    const fileEntity = await this.fileRepository.create(
      FileEntity.initializeNew({ url }),
    );

    return fileEntity.toObject();
  }

  private getFileUrl(fileName: string): string {
    const { AWS_BUCKET_NAME } = this.config.ENV.AWS;

    return `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
  }

  private getBufferFromBase64(base64: string): Buffer {
    return Buffer.from(base64, 'base64');
  }
}

export { File };

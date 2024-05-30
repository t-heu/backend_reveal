import dotenv from 'dotenv';
import { Request } from 'express';
import path from 'path';
import crypto from 'crypto';
import { Storage } from '@google-cloud/storage';
import Jimp from 'jimp';
import fs from 'fs';

dotenv.config();

export const tmpFolder = path.join(__dirname, '..', '..', 'tmp', 'uploads');

export enum Storage_Types {
  s3 = 's3',
  disk = 'disk',
  firebase_storage = 'firebase_storage',
}

interface IUploadConfig {
  driver: Storage_Types;
  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    // storage: StorageEngine;

    limits: {
      fileSize: number;
    };

    fileFilter(): void;
  };
}

export class UploadStorage {
  filename: string;

  file: string;

  constructor() {
    this.file = tmpFolder;
  }

  storage(filename?: string): string {
    const fileName =
      filename || `${crypto.randomBytes(16).toString('hex')}-${Date.now()}.jpg`;
    this.filename = fileName;
    this[process.env.STORAGE_DRIVER as Storage_Types]();
    return fileName;
  }

  s3(): void {}

  firebase_storage(): void {
    const gcobj = new Storage({
      projectId: process.env.FIREBASE_STORAGE_PROJECT_ID as string,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS as string,
    });

    const gcsBucket = gcobj.bucket(
      process.env.FIREBASE_STORAGE_BUCKET as string,
    );
    const gcFile = gcsBucket.file(this.filename);

    if (this.filename === 'no_photo.jpg') return;

    fs.readFile(path.resolve(this.file, 'no_photo.jpg'), (err, data) => {
      if (err) throw err;
      const str = data.toString('base64');
      const bufferFile = Buffer.from(str, 'base64');

      gcFile
        .createWriteStream({
          resumable: false,
          metadata: {
            cacheControl: 'no-cache',
          },
        })
        .end(bufferFile);
      // .on('error', (err: any) => console.log(err))
      // .on('finish', () => console.log('ok'));
    });
  }

  disk(): void {
    Jimp.read(path.resolve(this.file, 'no_photo.jpg'))
      .then(lenna => {
        return lenna
          .resize(250, 250)
          .quality(60)
          .write(path.resolve(this.file, this.filename));
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    // storage: new UploadStorage()[process.env.STORAGE_DRIVER as Storage_Types],
    limits: {
      fileSize: 1 * 1024 * 1024,
    },
    fileFilter: (req: Request, file: any, cb: any) => {
      const alowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];

      if (alowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb('incorrect image format');
      }
    },
  },
} as IUploadConfig;

import path from 'path';
import fs from 'fs';

const log = fs.createWriteStream(
  path.join(
    __dirname,
    '../../../logs',
    `log-${new Date().toISOString().split('T')[0]}.log`,
  ),
  { flags: 'a' },
);

if (new Date().getDate() === 30) {
  const directory = path.join(__dirname, '../../../logs');

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      if (file !== '.keep') {
        fs.unlink(path.join(directory, file), err2 => {
          if (err2) throw err2;
        });
      }
    });
  });
}

export { log };

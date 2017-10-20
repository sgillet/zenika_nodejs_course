const fs = require('fs');
const denodeify = require('denodeify');

const readFile = denodeify(fs.readFile);
const writeFile = denodeify(fs.writeFile);
const unlink = denodeify(fs.unlink);
const rename = denodeify(fs.rename);

const path = 'contacts.json';
const backupPath = path + ".back";

exports.callback = (contacts, callback) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      fs.writeFile(backupPath, data, (err) => {
        if (err) {
          console.error(err);
        } else {
          fs.writeFile(path, JSON.stringify(contacts, undefined, 2), (err) => {
            if (err) {
              console.error(err);

              fs.rename(backupPath, path, (err) => {
                if (err) {
                  console.error(err);
                }

                if (callback) {
                  callback();
                }
              });
            } else {
              fs.unlink(backupPath, (err) => {
                if (err) {
                  console.error(err);
                }

                if (callback) {
                  callback();
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.promise = (contacts, callback) => readFile(path)
  .then((data) => {
    console.log('Read', data.toString());
    return writeFile(backupPath, data);
  })
  .then(() => {
    console.log('Write');
    return writeFile(path, JSON.stringify(contacts, undefined, 2))
      .then(
        () => unlink(backupPath),
        (err) => {
          console.log('Error writing file', err);
          return rename(backupPath, path);
        }
      )
  })
  .then(() => {
    if (callback) {
      callback();
    }
  })
  .catch((err) => {
    console.error('Error', err);
  });

exports.asyncAwait = (contacts, callback) => {
  return (
    async function() {
      const data = await readFile(path);
      await writeFile(backupPath, data);
      try {
        await writeFile(path, JSON.stringify(contacts, undefined, 2));
      } catch (err) {
        await rename(backupPath, path);
      } finally {
        await unlink(backupPath);
      }
    }
  )
    ()
    .then(callback)
    .catch(callback);
};

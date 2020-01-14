/* eslint-disable no-undef */
/**
 * Library for storing and editing data
 */

// Dependencies
const fs = require('fs');
const path = require('path');

// Base directory of the data folder
const baseDir = path.join(__dirname, '/../.data/');

// Write data to a JSON file
function create(dir, file, data, callback) {
  // Open the file for writing
  fs.open(
    `${baseDir}${dir}/${file}.json`,
    'wx',
    (openError, fileDescriptor) => {
      if (!openError && fileDescriptor) {
        // Convert data to string
        const stringData = JSON.stringify(data);

        fs.writeFile(fileDescriptor, stringData, writeError => {
          if (!writeError) {
            fs.close(fileDescriptor, closeError => {
              if (!closeError) {
                callback(false);
              } else {
                callback('Error closing new file');
              }
            });
          } else {
            callback('Error writing to new file');
          }
        });
      } else {
        callback('Could not create new file, it may already exist');
      }
    }
  );
}

function read(dir, file, callback) {
  fs.readFile(`${baseDir}${dir}/${file}.json`, 'utf-8', (err, data) => {
    callback(err, data);
  });
}

function update(dir, file, data, callback) {
  fs.open(`${baseDir}${dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      const stringData = JSON.stringify(data);

      fs.ftruncate(fileDescriptor, truncateError => {
        if (!truncateError) {
          fs.writeFile(fileDescriptor, stringData, writeError => {
            if (!writeError) {
              fs.close(fileDescriptor, closeError => {
                if (!closeError) {
                  callback(false, stringData);
                } else {
                  callback('error closing');
                }
              });
            } else {
              callback('error writing');
            }
          });
        } else {
          callback('error truncate');
        }
      });
    }
  });
}

function remove(dir, file, callback) {
  fs.unlink(`${baseDir}${dir}/${file}.json`, err => {
    if (!err) {
      callback(false);
    } else {
      callback('error deleting');
    }
  });
}

// Container for the module
module.exports = {
  create,
  read,
  update,
  remove,
};

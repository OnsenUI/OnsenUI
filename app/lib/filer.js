/** 
 * Copyright 2013 - Eric Bidelman
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 
 * @fileoverview
 * Convenient wrapper library for the HTML5 Filesystem API, implementing
 * familiar UNIX commands (cp, mv, ls) for its API.
 * 
 * @author Eric Bidelman (ebidel@gmail.com)
 * @version: 0.4.3
 */

'use strict';

var self = this; // window or worker context.

self.URL = self.URL || self.webkitURL;
self.requestFileSystem = self.requestFileSystem || self.webkitRequestFileSystem;
self.resolveLocalFileSystemURL = self.resolveLocalFileSystemURL ||
                                 self.webkitResolveLocalFileSystemURL;
navigator.temporaryStorage = navigator.temporaryStorage ||
                             navigator.webkitTemporaryStorage;
navigator.persistentStorage = navigator.persistentStorage ||
                              navigator.webkitPersistentStorage;
self.BlobBuilder = self.BlobBuilder || self.MozBlobBuilder ||
                   self.WebKitBlobBuilder;

// Prevent errors in browsers that don't support FileError.
if (self.FileError === undefined) {
  var FileError = function() {};
  FileError.prototype.prototype = Error.prototype;
}

var Util = {

  /**
   * Turns a NodeList into an array.
   *
   * @param {NodeList} list The array-like object.
   * @return {Array} The NodeList as an array.
   */
  toArray: function(list) {
    return Array.prototype.slice.call(list || [], 0);
  },

  /*toDataURL: function(contentType, uint8Array) {
    return 'data:' + contentType + ';base64,' +
        self.btoa(this.arrayToBinaryString(uint8Array));
  },*/

  /**
   * Creates a data: URL from string data.
   *
   * @param {string} str The content to encode the data: URL from.
   * @param {string} contentType The mimetype of the data str represents.
   * @param {bool=} opt_isBinary Whether the string data is a binary string
   *     (and therefore should be base64 encoded). True by default.
   * @return {string} The created data: URL.
   */
  strToDataURL: function(str, contentType, opt_isBinary) {
    var isBinary = opt_isBinary != undefined ? opt_isBinary : true;
    if (isBinary) {
      return 'data:' + contentType + ';base64,' + self.btoa(str);
    } else {
      return 'data:' + contentType + ',' + str;
    }
  },

  /**
   * Creates a blob: URL from a binary str.
   *
   * @param {string} binStr The content as a binary string.
   * @param {string=} opt_contentType An optional mimetype of the data.
   * @return {string} A new blob: URL.
   */
  strToObjectURL: function(binStr, opt_contentType) {

    var ui8a = new Uint8Array(binStr.length);
    for (var i = 0; i < ui8a.length; ++i) { 
      ui8a[i] = binStr.charCodeAt(i);
    }

    var blob = new Blob([ui8a],
                        opt_contentType ? {type: opt_contentType} : {});

    return self.URL.createObjectURL(blob);
  },

  /**
   * Creates a blob: URL from a File or Blob object.
   *
   * @param {Blob|File} blob The File or Blob data.
   * @return {string} A new blob: URL.
   */
  fileToObjectURL: function(blob) {
    return self.URL.createObjectURL(blob);
  },

  /**
   * Reads a File or Blob object and returns it as an ArrayBuffer.
   *
   * @param {Blob|File} blob The File or Blob data.
   * @param {Function} callback Success callback passed the array buffer.
   * @param {Function=} opt_error Optional error callback if the read fails.
   */
  fileToArrayBuffer: function(blob, callback, opt_errorCallback) {
    var reader = new FileReader();
    reader.onload = function(e) {
      callback(e.target.result);
    };
    reader.onerror = function(e) {
      if (opt_errorCallback) {
        opt_errorCallback(e);
      }
    };

    reader.readAsArrayBuffer(blob);
  },

  /**
   * Creates and returns a blob from a data URL (either base64 encoded or not).
   *
   * @param {string} dataURL The data URL to convert.
   * @return {Blob} A blob representing the array buffer data.
   */
  dataURLToBlob: function(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(',');
      var contentType = parts[0].split(':')[1];
      var raw = parts[1];

      return new Blob([raw], {type: contentType});
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
  },

  /**
   * Reads an ArrayBuffer as returns its contents as a binary string.
   *
   * @param {ArrayBuffer} buffer The buffer of data.
   * @param {string=} opt_contentType An optional mimetype of the data.
   * @return {Blob} A blob representing the array buffer data.
   */
  arrayBufferToBlob: function(buffer, opt_contentType) {
    var uInt8Array = new Uint8Array(buffer);
    return new Blob([uInt8Array],
                    opt_contentType ? {type: opt_contentType} : {});
  },

  /**
   * Reads an ArrayBuffer as returns its contents as a binary string.
   *
   * @param {ArrayBuffer} buffer The buffer of data.
   * @param {Function} callback Success callback passed the binary string.
   * @param {Function=} opt_error Optional error callback if the read fails.
   */
  arrayBufferToBinaryString: function(buffer, callback, opt_errorCallback) {
    var reader = new FileReader();
    reader.onload = function(e) {
      callback(e.target.result);
    };
    reader.onerror = function(e) {
      if (opt_errorCallback) {
        opt_errorCallback(e);
      }
    };

    var uInt8Array = new Uint8Array(buffer);
    reader.readAsBinaryString(new Blob([uInt8Array]));
  },

  /**
   * Create a binary string out of an array of numbers (bytes), each varying
   * from 0-255.
   *
   * @param {Array} bytes The array of numbers to transform into a binary str.
   * @return {string} The byte array as a string.
   */
  arrayToBinaryString: function(bytes) {
    if (typeof bytes != typeof []) {
      return null;
    }
    var i = bytes.length;
    var bstr = new Array(i);
    while (i--) {
      bstr[i] = String.fromCharCode(bytes[i]);
    }
    return bstr.join('');
  },

  /**
   * Returns the file extension for a given filename.
   *
   * @param {string} filename The filename.
   * @return {string} The file's extension.
   */
  getFileExtension: function(filename) {
    var idx = filename.lastIndexOf('.');
    return idx != -1 ? filename.substring(idx) : '';
  }
};


var MyFileError = function(obj) {
  this.prototype = FileError.prototype;
  this.code = obj.code;
  this.name = obj.name;
};
//MyFileError.prototype.__proto__ = FileError.prototype;

// Extend FileError with custom errors and a convenience method to get error
// code mnemonic.
FileError.BROWSER_NOT_SUPPORTED = 1000;

// TODO: remove when FileError.name is implemented (crbug.com/86014).
FileError.prototype.__defineGetter__('name', function() {
  var keys = Object.keys(FileError);
  for (var i = 0, key; key = keys[i]; ++i) {
    if (FileError[key] == this.code) {
      return key;
    }
  }
  return 'Unknown Error';
});


var Filer = new function() {

  var FS_INIT_ERROR_MSG = 'Filesystem has not been initialized.';
  var NOT_IMPLEMENTED_MSG = 'Not implemented.';
  var NOT_A_DIRECTORY = 'Path was not a directory.';
  var INCORRECT_ARGS = 'These method arguments are not supported.';
  var FS_URL_SCHEME = 'filesystem:';
  var DEFAULT_FS_SIZE = 1024 * 1024; // 1MB.

  var fs_ = null;
  var cwd_ = null;
  var isOpen_ = false;

  var isFsURL_ = function(path) {
    return path.indexOf(FS_URL_SCHEME) == 0;
  };

  // Path can be relative or absolute. If relative, it's taken from the cwd_.
  // If a filesystem URL is passed it, it is simple returned
  var pathToFsURL_ = function(path) {
    if (!isFsURL_(path)) {
      if (path[0] == '/') {
        path = fs_.root.toURL() + path.substring(1);
      } else if (path.indexOf('./') == 0 || path.indexOf('../') == 0) {
        if (path == '../' && cwd_ != fs_.root) {
          path = cwd_.toURL() + '/' + path;
        } else {
          path = cwd_.toURL() + path;
        }
      } else {
        path = cwd_.toURL() + '/' + path;
      }
    }

    return path;
  };

  /**
   * Looks up a FileEntry or DirectoryEntry for a given path.
   *
   * @param {function(...FileEntry|DirectorEntry)} callback A callback to be
   *     passed the entry/entries that were fetched. The ordering of the
   *     entries passed to the callback correspond to the same order passed
   *     to this method.
   * @param {...string} var_args 1-2 paths to lookup and return entries for.
   *     These can be paths or filesystem: URLs.
   */
  var getEntry_ = function(callback, var_args) {
    var srcStr = arguments[1];
    var destStr = arguments[2];

    var onError = function(e) {
      if (e.code == FileError.NOT_FOUND_ERR) {
        if (destStr) {
          throw new Error('"' + srcStr + '" or "' + destStr +
                          '" does not exist.');
        } else {
          throw new Error('"' + srcStr + '" does not exist.');
        }
      } else {
        throw new Error('Problem getting Entry for one or more paths.');
      }
    };

    // Build a filesystem: URL manually if we need to.
    var src = pathToFsURL_(srcStr);

    if (arguments.length == 3) {
      var dest = pathToFsURL_(destStr);
      self.resolveLocalFileSystemURL(src, function(srcEntry) {
        self.resolveLocalFileSystemURL(dest, function(destEntry) {
          callback(srcEntry, destEntry);
        }, onError);
      }, onError);
    } else {
      self.resolveLocalFileSystemURL(src, callback, onError);
    }
  };

  /**
   * Copy or moves a file or directory to a destination.
   *
   * See public method's description (Filer.cp()) for rest of params.
   * @param {Boolean=} opt_deleteOrig True if the original entry should be
   *     deleted after the copy takes place, essentially making the operation
   *     a move instead of a copy. Defaults to false.
   */
  var copyOrMove_ = function(src, dest, opt_newName, opt_successCallback,
                             opt_errorHandler, opt_deleteOrig) {
    var self = this;

    if (!fs_) {
      throw new Error(FS_INIT_ERROR_MSG);
    }

    if (typeof src != typeof dest) {
      throw new Error(INCORRECT_ARGS);
    }

    var newName = opt_newName || null;
    var deleteOrig = opt_deleteOrig != undefined ? opt_deleteOrig : false;

    if ((src.isFile || dest.isDirectory) && dest.isDirectory) {
      if (deleteOrig) {
        src.moveTo(dest, newName, opt_successCallback, opt_errorHandler);
      } else {
        src.copyTo(dest, newName, opt_successCallback, opt_errorHandler);
      }
    } else {
      getEntry_(function(srcEntry, destDir) {
        if (!destDir.isDirectory) {
          var e = new Error('Oops! "' + destDir.name + ' is not a directory!');
          if (opt_errorHandler) {
            opt_errorHandler(e);
          } else {
            throw e;
          }
          return;
        }
        if (deleteOrig) {
          srcEntry.moveTo(destDir, newName, opt_successCallback, opt_errorHandler);
        } else {
          srcEntry.copyTo(destDir, newName, opt_successCallback, opt_errorHandler);
        }
      }, src, dest);
    }
  }

  function Filer(fs) {
    fs_  = fs || null;
    if (fs_) {
      cwd_ = fs_.root;
      isOpen_ = true; // TODO: this may not be the case.
    }
  }

  Filer.DEFAULT_FS_SIZE = DEFAULT_FS_SIZE;
  Filer.version = '0.4.3';

  Filer.prototype = {
    get fs() {
      return fs_;
    },
    get isOpen() {
      return isOpen_;
    },
    get cwd() {
      return cwd_;
    }
  }

  /**
   * Constructs and returns a filesystem: URL given a path.
   *
   * @param {string=} path The path to construct a URL for.
   *     size {int=} The storage size (in bytes) to open the filesystem with.
   *         Defaults to DEFAULT_FS_SIZE.
   * @return {string} The filesystem: URL.
   */
  Filer.prototype.pathToFilesystemURL = function(path) {
    return pathToFsURL_(path);
  }

  /**
   * Initializes (opens) the file system.
   *
   * @param {object=} opt_initObj Optional object literal with the following
   *     properties. Note: If {} or null is passed, default values are used.
   *     persistent {Boolean=} Whether the browser should use persistent quota.
   *         Default is false.
   *     size {int=} The storage size (in bytes) to open the filesystem with.
   *         Defaults to DEFAULT_FS_SIZE.
   * @param {Function=} opt_successCallback Optional success handler passed a
   *      DOMFileSystem object.
   * @param {Function=} opt_errorHandler Optional error callback.
   */
  Filer.prototype.init = function(opt_initObj, opt_successCallback,
                                  opt_errorHandler) {
    if (!self.requestFileSystem) {
      throw new MyFileError({
        code: FileError.BROWSER_NOT_SUPPORTED,
        name: 'BROWSER_NOT_SUPPORTED'
      });
    }

    var initObj = opt_initObj ? opt_initObj : {}; // Use defaults if obj is null.

    var size = initObj.size || DEFAULT_FS_SIZE;
    this.type = self.TEMPORARY;
    if ('persistent' in initObj && initObj.persistent) {
      this.type = self.PERSISTENT;
    }

    var init = function(fs) {
      this.size = size;
      fs_ = fs;
      cwd_ = fs_.root;
      isOpen_ = true;

      opt_successCallback && opt_successCallback(fs);
    };

    if (this.type == self.PERSISTENT && !!navigator.persistentStorage) {
      navigator.persistentStorage.requestQuota(size, function(grantedBytes) {  
        self.requestFileSystem(
            this.type, grantedBytes, init.bind(this), opt_errorHandler);
      }.bind(this), opt_errorHandler);
    } else {
      self.requestFileSystem(
          this.type, size, init.bind(this), opt_errorHandler);
    }
  };

  /**
   * Reads the contents of a directory.
   *
   * @param {string|DirectoryEntry} dirEntryOrPath A path relative to the
   *     current working directory. In most cases that is the root entry, unless
   *     cd() has been called. A DirectoryEntry or filesystem URL can also be
   *     passed, in which case, the folder's contents will be returned.
   * @param {Function} successCallback Success handler passed an Array<Entry>.
   * @param {Function=} opt_errorHandler Optional error callback.
   */
  Filer.prototype.ls = function(dirEntryOrPath, successCallback,
                                opt_errorHandler) {
    if (!fs_) {
      throw new Error(FS_INIT_ERROR_MSG);
    }

    var callback = function(dirEntry) {

      cwd_ = dirEntry;

      // Read contents of current working directory. According to spec, need to
      // keep calling readEntries() until length of result array is 0. We're
      // guarenteed the same entry won't be returned again.
      var entries_ = [];
      var reader = cwd_.createReader();

      var readEntries = function() {
        reader.readEntries(function(results) {
          if (!results.length) {
            // By default, sort the list by name.
            entries_.sort(function(a, b) {
              return a.name < b.name ? -1 : b.name < a.name ? 1 : 0;
            });
            successCallback(entries_);
          } else {
            entries_ = entries_.concat(Util.toArray(results));
            readEntries();
          }
        }, opt_errorHandler);
      };

      readEntries();
    };

    if (dirEntryOrPath.isDirectory) { // passed a DirectoryEntry.
      callback(dirEntryOrPath);
    } else if (isFsURL_(dirEntryOrPath)) { // passed a filesystem URL.
      getEntry_(callback, pathToFsURL_(dirEntryOrPath));
    } else { // Passed a path. Look up DirectoryEntry and proceeed.
      // TODO: Find way to use getEntry_(callback, dirEntryOrPath); with cwd_.
      cwd_.getDirectory(dirEntryOrPath, {}, callback, opt_errorHandler);
    }
  };

  /**
   * Creates a new directory.
   *
   * @param {string} path The name of the directory to create. If a path is
   *     given, each intermediate dir is created (e.g. similar to mkdir -p).
   * @param {bool=} opt_exclusive True if an error should be thrown if
   *     one or more of the directories already exists. False by default.
   * @param {Function} opt_successCallback Success handler passed the
   *     DirectoryEntry that was created. If we were passed a path, the last
   *     directory that was created is passed back.
   * @param {Function=} opt_errorHandler Optional error callback.
   */
  Filer.prototype.mkdir = function(path, opt_exclusive, opt_successCallback,
                                   opt_errorHandler) {
    if (!fs_) {
      throw new Error(FS_INIT_ERROR_MSG);
    }

    var exclusive = opt_exclusive != null ? opt_exclusive : false;

    var folderParts = path.split('/');

    var createDir = function(rootDir, folders) {
      // Throw out './' or '/' and move on. Prevents: '/foo/.//bar'.
      if (folders[0] == '.' || folders[0] == '') {
        folders = folders.slice(1);
      }

      rootDir.getDirectory(folders[0], {create: true, exclusive: exclusive},
        function (dirEntry) {
          if (dirEntry.isDirectory) { // TODO: check shouldn't be necessary.
            // Recursively add the new subfolder if we have more to create and
            // There was more than one folder to create.
            if (folders.length && folderParts.length != 1) {
              createDir(dirEntry, folders.slice(1));
            } else {
              // Return the last directory that was created.
              if (opt_successCallback) opt_successCallback(dirEntry);
            }
          } else {
            var e = new Error(path + ' is not a directory');
            if (opt_errorHandler) {
              opt_errorHandler(e);
            } else {
              throw e;
            }
          }
        },
        function(e) {
          if (e.code == FileError.INVALID_MODIFICATION_ERR) {
            e.message = "'" + path + "' already exists";
            if (opt_errorHandler) {
              opt_errorHandler(e);
            } else {
              throw e;
            }
          }
        }
      );
    };

    createDir(cwd_, folderParts);
  };

  /**
   * Looks up and return a File for a given file entry.
   *
   * @param {string|FileEntry} entryOrPath A path, filesystem URL, or FileEntry
   *     of the file to lookup.
   * @param {Function} successCallback Success callback passed the File object.
   * @param {Function=} opt_errorHandler Optional error callback.
   */
  Filer.prototype.open = function(entryOrPath, successCallback, opt_errorHandler) {
    if (!fs_) {
      throw new Error(FS_INIT_ERROR_MSG);
    }

    if (entryOrPath.isFile) {
      entryOrPath.file(successCallback, opt_errorHandler);
    } else {
      getEntry_(function(fileEntry) {
        fileEntry.file(successCallback, opt_errorHandler);
      }, pathToFsURL_(entryOrPath));
    }
  };

  /**
   * Creates an empty file.
   *
   * @param {string} path The relative path of the file to create, from the
   *     current working directory.
   * @param {bool=} opt_exclusive True (default) if an error should be thrown if
   *     the file already exists.
   * @param {Function} successCallback A success callback, which is passed
   *     the new FileEntry.
   * @param {Function=} opt_errorHandler Optional error callback.
   */
  Filer.prototype.create = function(path, opt_exclusive, successCallback,
                                    opt_errorHandler) {
    if (!fs_) {
      throw new Error(FS_INIT_ERROR_MSG);
    }

    var exclusive = opt_exclusive != null ? opt_exclusive : true;

    cwd_.getFile(path, {create: true,  exclusive: exclusive}, successCallback,
      function(e) {
        if (e.code == FileError.INVALID_MODIFICATION_ERR) {
          e.message = "'" + path + "' already exists";
        }
        if (opt_errorHandler) {
          opt_errorHandler(e);
        } else {
          throw e;
        }
      }
    );
  };

  /**
    * Moves a file or directory.
    *
    * @param {string|FileEntry|DirectoryEntry} src The file/directory
    *     to move. If src is a string, a path or filesystem: URL is accepted.
    * @param {string|DirectoryEntry} dest The directory to move the src into.
    *     If dest is a string, a path or filesystem: URL is accepted.
    *     Note: dest needs to be the same type as src.
    * @param {string=} opt_newName An optional new name for the moved entry.
    * @param {Function=} opt_successCallback Optional callback passed the moved
    *     entry on a successful move.
    * @param {Function=} opt_errorHandler Optional error callback.
    */
  Filer.prototype.mv = function(src, dest, opt_newName, opt_successCallback,
                                opt_errorHandler) {
    copyOrMove_.bind(this, src, dest, opt_newName, opt_successCallback,
                     opt_errorHandler, true)();
  };

  /**
   * Deletes a file or directory entry.
   *
   * @param {string|FileEntry|DirectoryEntry} entryOrPath The file or directory
   *     to remove. If entry is a DirectoryEntry, its contents are removed
   *     recursively. If entryOrPath is a string, a path or filesystem: URL is
   *     accepted.
   * @param {Function} successCallback Zero arg callback invoked on
   *     successful removal.
   * @param {Function=} opt_errorHandler Optional error callback.
   */
  Filer.prototype.rm = function(entryOrPath, successCallback,
                                opt_errorHandler) {
    if (!fs_) {
      throw new Error(FS_INIT_ERROR_MSG);
    }

    var removeIt = function(entry) {
      if (entry.isFile) {
        entry.remove(successCallback, opt_errorHandler);
      } else if (entry.isDirectory) {
        entry.removeRecursively(successCallback, opt_errorHandler);
      }
    };

    if (entryOrPath.isFile || entryOrPath.isDirectory) {
      removeIt(entryOrPath);
    } else {
      getEntry_(removeIt, entryOrPath);
    }
  };

  /**
   * Changes the current working directory.
   *
   * @param {string|DirectoryEntry} dirEntryOrPath A DirectoryEntry to move into
   *     or a path relative to the current working directory. A filesystem: URL
   *     is also accepted
   * @param {Function=} opt_successCallback Optional success callback, which is
   *     passed the DirectoryEntry of the new current directory.
   * @param {Function=} opt_errorHandler Optional error callback.
   */
  Filer.prototype.cd = function(dirEntryOrPath, opt_successCallback,
                                opt_errorHandler) {
    if (!fs_) {
      throw new Error(FS_INIT_ERROR_MSG);
    }

    if (dirEntryOrPath.isDirectory) {
      cwd_ = dirEntryOrPath;
      opt_successCallback && opt_successCallback(cwd_);
    } else {
      // Build a filesystem: URL manually if we need to.
      var dirEntryOrPath = pathToFsURL_(dirEntryOrPath);

      getEntry_(function(dirEntry) {
        if (dirEntry.isDirectory) {
          cwd_ = dirEntry;
          opt_successCallback && opt_successCallback(cwd_);
        } else {
          var e = new Error(NOT_A_DIRECTORY);
          if (opt_errorHandler) {
            opt_errorHandler(e);
          } else {
            throw e;
          }
        }
      }, dirEntryOrPath);
    }
  };

  /**
    * Copies a file or directory to a destination.
    *
    * @param {string|FileEntry|DirectoryEntry} src The file/directory
    *     to copy. If src is a string, a path or filesystem: URL is accepted.
    * @param {string|DirectoryEntry} dest The directory to copy the src into.
    *     If dest is a string, a path or filesystem: URL is accepted.
    *     Note: dest needs to be the same type as src.
    * @param {string=} opt_newName An optional name for the copied entry.
    * @param {Function=} opt_successCallback Optional callback passed the moved
    *     entry on a successful copy.
    * @param {Function=} opt_errorHandler Optional error callback.
    */
  Filer.prototype.cp = function(src, dest, opt_newName, opt_successCallback,
                                opt_errorHandler) {
    copyOrMove_.bind(this, src, dest, opt_newName, opt_successCallback,
                     opt_errorHandler)();
  };

  /**
   * Writes data to a file.
   *
   * If the file already exists, its contents are overwritten.
   *
   * @param {string|FileEntry} entryOrPath A path, filesystem URL, or FileEntry
    *     of the file to lookup.
   * @param {object} dataObj The data to write. Example:
   *     {data: string|Blob|File|ArrayBuffer, type: mimetype, append: true}
   *     If append is specified, data is appended to the end of the file.
   * @param {Function} opt_successCallback Success callback, which is passed
   *     the created FileEntry and FileWriter object used to write the data.
   * @param {Function=} opt_errorHandler Optional error callback.
   */
  Filer.prototype.write = function(entryOrPath, dataObj, opt_successCallback,
                                   opt_errorHandler) {
    if (!fs_) {
      throw new Error(FS_INIT_ERROR_MSG);
    }

    var writeFile_ = function(fileEntry) {
      fileEntry.createWriter(function(fileWriter) {

        fileWriter.onerror = opt_errorHandler;

        if (dataObj.append) {
          fileWriter.onwriteend = function(e) {
            if (opt_successCallback) opt_successCallback(fileEntry, this);
          };

          fileWriter.seek(fileWriter.length); // Start write position at EOF.
        } else {
          var truncated = false;
          fileWriter.onwriteend = function(e) {
            // Truncate file to newly written file size.
            if (!truncated) {
              truncated = true;
              this.truncate(this.position);
              return;
            }
            if (opt_successCallback) opt_successCallback(fileEntry, this);
          };
        }

        // Blob() takes ArrayBufferView, not ArrayBuffer.
        if (dataObj.data.__proto__ == ArrayBuffer.prototype) {
          dataObj.data = new Uint8Array(dataObj.data);
        }
        var blob = new Blob([dataObj.data],
                            dataObj.type ? {type: dataObj.type} : {});

        fileWriter.write(blob);

      }, opt_errorHandler);
    };

    if (entryOrPath.isFile) {
      writeFile_(entryOrPath);
    } else if (isFsURL_(entryOrPath)) {
      getEntry_(writeFile_, entryOrPath);
    } else {
      cwd_.getFile(entryOrPath, {create: true, exclusive: false}, writeFile_,
                   opt_errorHandler);
    }
  };
  
  /**
   * Displays disk space usage.
   *
   * @param {Function} successCallback Success callback, which is passed
   *     Used space, Free space and Currently allocated total space in bytes.
   * @param {Function=} opt_errorHandler Optional error callback.
   */
  Filer.prototype.df = function(successCallback, opt_errorHandler) {
    var queryCallback = function(byteUsed, byteCap) {
      successCallback(byteUsed, byteCap - byteUsed, byteCap);
    }
    
    if (!(navigator.temporaryStorage.queryUsageAndQuota && navigator.persistentStorage.queryUsageAndQuota)) {
      throw new Error(NOT_IMPLEMENTED_MSG);
    }

    if (self.TEMPORARY == this.type) {
      navigator.temporaryStorage.queryUsageAndQuota(queryCallback, opt_errorHandler);
    } else if (self.PERSISTENT == this.type) {
      navigator.persistentStorage.queryUsageAndQuota(queryCallback, opt_errorHandler);
    }
  };
                                   
  return Filer;
};

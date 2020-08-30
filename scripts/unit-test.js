const karma = require('karma');
const path = require('path');
const yargs = require('yargs');
const glob = require('glob');
const colors = require('ansi-colors');
const log = require('fancy-log');

const argv = yargs.argv;

(async () => {
  const specs = argv.specs || '../core/src/**/*.spec.js'; // you cannot use commas for --specs
  let browsers = argv.browsers ? argv.browsers.split(',').map(s => s.trim()) : ['local_chrome_headless', 'remote_macos_safari'];

  // If the Sauce credentials are not set, remove the remote builds from the queue.
  // This way, we can run the unit test more easily locally, as well as safely for
  // pull requests. These values are not passed to PR builds because in theory the
  // PR could log out these values and expose them.
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    browsers = browsers.filter(browser => {
      const isRemote = browser.indexOf('remote') === 0;

      if (isRemote) {
        console.warn(`Not testing on ${browser} due to missing credentials`);
        return false;
      } else {
        return true;
      }
    });
  }

  let listOfSpecFiles;
  if (argv.separately) { // resolve glob pattern
    listOfSpecFiles = glob.sync( path.join(__dirname, specs) );
  } else { // do not resolve glob pattern
    listOfSpecFiles = new Array( path.join(__dirname, specs) );
  }

  // if --disable-warnings is specified, suppress warnings from Onsen UI
  if (argv['disable-warnings']) {
    global.KARMA_DISABLE_WARNINGS = true;
  }

  let testsPassed = true; // error flag

  // Separately launch Karma server for each browser and each set of spec files
  try {
    for (let j = 0 ; j < browsers.length ; j++) {
      log(colors.blue(`Start unit testing on ${browsers[j]}...`));

      // Pass parameters to Karma config file via `global`
      global.KARMA_BROWSER = browsers[j];

      for (let i = 0 ; i < listOfSpecFiles.length ; i++) {
        log(colors.blue(path.relative(__dirname, listOfSpecFiles[i])));

        // Pass parameters to Karma config file via `global`
        global.KARMA_SPEC_FILES = listOfSpecFiles[i];

        // Launch Karma server and wait until it exits
        await (async () => {
          console.log(path.join(__dirname, '../core/test/unit/karma.conf.js'));
          return new Promise((resolve, reject) => {
            new karma.Server(
              {
                configFile: path.join(__dirname, '../core/test/unit/karma.conf.js'),
                singleRun: argv.watch ? false : true, // overrides the corresponding option in config file
                autoWatch: argv.watch ? true : false // same as above
              },
              (exitCode) => {
                const exitMessage = `Karma server has exited with ${exitCode}`;

                switch (exitCode) {
                  case 0: // success
                    log(colors.green(exitMessage));
                    log(colors.green('Passed unit tests successfully.'));
                    break;
                  default: // error
                    log(colors.red(exitMessage));
                    log(colors.red('Failed to pass some unit tests. (Otherwise, the unit testing itself is broken)'));
                    testsPassed = false;
                }
                resolve();
              }
            ).start();
          });
        })();

        // Wait for 500 ms before next iteration to avoid crashes
        await (async () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => { resolve(); }, 500 );
          });
        })();
      }
    }
  } finally {
    global.KARMA_BROWSER = undefined;
    global.KARMA_SPEC_FILES = undefined;
  }

  if (testsPassed) {
    log(colors.green('Passed unit tests on all browsers!'));
  } else {
    log(colors.red('Failed to pass unit tests on some browsers.'));
    throw new Error('unit-test has failed');
  }
})();

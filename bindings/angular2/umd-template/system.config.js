
System.config({
  map: {
    // Set correct url
    'ngx-onsenui': '../dist/bundles/ngx-onsenui.umd.js',
    '@angular/core': 'https://unpkg.com/@angular/core@2.0.0/bundles/core.umd.js',
    '@angular/compiler': 'https://unpkg.com/@angular/compiler@2.0.0/bundles/compiler.umd.js',
    '@angular/common': 'https://unpkg.com/@angular/common@2.0.0/bundles/common.umd.js',
    '@angular/platform-browser': 'https://unpkg.com/@angular/platform-browser@2.0.0/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'https://unpkg.com/@angular/platform-browser-dynamic@2.0.0/bundles/platform-browser-dynamic.umd.js',
    'rxjs': 'https://unpkg.com/rxjs@5.0.0-beta.11',
    'process': 'https://unpkg.com/process@0.11.9',
    'app': './app.ts'
  },
  packages: {
    'ngx-onsenui': {
      format: 'cjs'
    },
    'core-js': {
      main: 'index.js',
      format: 'cjs'
    },
    'typescript': {
      format: 'cjs'
    },
    'app': {
      defaultExtension: 'ts',
      format: 'esm'
    }
  },
  meta: {
    'inline': {
      loader: 'inline-loader'
    }
  },
  transpiler: 'typescript',
  typescriptOptions: {
    'emitDecoratorMetadata': true
  }
});

System.amdDefine('inline-loader', [], function() {
  return {
    fetch: function() {
      return new Promise(function(resolve, reject) {
        if (document.readyState === "complete") {
          load();
        } else {
          window.onload = load;
        }

        function load() {
          const target = document.querySelector('script[type="text/typescript"]');

          if (target) {
            resolve(target.textContent);
          } else {
            reject('Error: inline-loader fail.');
          }
        }
      });
    }
  };

});

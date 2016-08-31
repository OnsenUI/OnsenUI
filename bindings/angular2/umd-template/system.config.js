
System.config({
  map: {
    // Set correct url
    'angular2-onsenui': '../dist/bundles/angular2-onsenui.umd.js',
    '@angular/core': 'https://unpkg.com/@angular/core@2.0.0-rc.5/bundles/core.umd.js',
    '@angular/compiler': 'https://unpkg.com/@angular/compiler@2.0.0-rc.5/bundles/compiler.umd.js',
    '@angular/common': 'https://unpkg.com/@angular/common@2.0.0-rc.5/bundles/common.umd.js',
    '@angular/platform-browser': 'https://unpkg.com/@angular/platform-browser@2.0.0-rc.5/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'https://unpkg.com/@angular/platform-browser-dynamic@2.0.0-rc.5/bundles/platform-browser-dynamic.umd.js',
    'rxjs': 'https://unpkg.com/rxjs@5.0.0-beta.11',
    'process': 'https://unpkg.com/process@0.11.9',
    'app': './app.ts'
  },
  packages: {
    'angular2-onsenui': {
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
  transpiler: 'typescript',
  typescriptOptions: {
    'emitDecoratorMetadata': true
  }
});


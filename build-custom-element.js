const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
    './dist/search-portlet-neoris/runtime.js',
    './dist/search-portlet-neoris/polyfills.js',
    './dist/search-portlet-neoris/main.js'
  ];
  await fs.ensureDir('angular-elements-build');
  await fs.removeSync('angular-elements-build/angular-elements.js');
  await concat(files, 'angular-elements-build/angular-elements.js');

  await fs.copy('./src/app/app.component.css', 'angular-elements-build/styles.css');
})();

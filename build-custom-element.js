const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
    './dist/portlet-blog/runtime.js',
    './dist/portlet-blog/polyfills.js',
    './dist/portlet-blog/main.js'
  ];
  await fs.ensureDir('angular-elements-build');
  await fs.removeSync('angular-elements-build/portlet-blog.js');
  await concat(files, 'angular-elements-build/portlet-blog.js');

  await fs.copy('./src/app/app.component.css', 'angular-elements-build/styles.css');
})();

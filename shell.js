var shell = require('shelljs');
shell.mv('build/bundled', 'build/pages');
shell.cp('-R', 'api/', 'build/api');
shell.cp('config.js', 'build/config.js');
shell.cp('manifest.json', 'build/manifest.json');
shell.cp('package.json', 'build/package.json');
shell.cp('polymer.json', 'build/polymer.json');
shell.cp('redirects.json', 'build/redirects.json');
shell.cp('renovate.json', 'build/renovate.json');
shell.cp('server.js', 'build/server.js');



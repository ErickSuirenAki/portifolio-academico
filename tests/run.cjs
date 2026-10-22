// Compile test modules in memory so the built-in Node runner also works on Node 20.
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = function compile(module, filename) {
  const source = fs.readFileSync(filename, 'utf8');
  const result = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    fileName: filename,
  });
  module._compile(result.outputText, filename);
};
require('./validation.test.ts');
require('./admin.test.cjs');
require('./lattes.test.cjs');
require('./homepage.test.ts');

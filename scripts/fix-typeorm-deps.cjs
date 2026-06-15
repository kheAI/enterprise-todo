// @ptc-org/nestjs-query-graphql uses a bare deep import of @nestjs/graphql
// without the .js extension. @nestjs/graphql v13 added a strict `exports`
// field — Node.js no longer auto-resolves the extension through exports.
// This hook patches Module._resolveFilename to add .js before it fails.
const Module = require('module');
const orig = Module._resolveFilename;
Module._resolveFilename = function (request, ...args) {
  if (request === '@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage') {
    return orig.call(this, request + '.js', ...args);
  }
  return orig.call(this, request, ...args);
};

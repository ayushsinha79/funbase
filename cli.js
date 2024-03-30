#!/usr/bin/env node

const {run} = require('./compile');

const filename = process.argv[2];
if (!filename) {
  console.error('Usage: funbase <filename>');
  process.exit(1);
}

run(filename);
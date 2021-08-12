#!/usr/bin/env node

const yargs = require('yargs');
const beaconForIBM = require('.');

const options = yargs
  .demandOption(['u'])
  .alias('u', 'url')
  .describe('url', 'URL to audit')
  .alias('h', 'help')
  .help('h').argv;

beaconForIBM(options);

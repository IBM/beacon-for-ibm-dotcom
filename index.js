const fs = require('fs');
const path = require('path');
const lighthouse = require('lighthouse');
const config = require(path.join(__dirname, 'src/config/custom-config.js'));
const chromeLauncher = require('chrome-launcher');

/**
 * @param {object} args Command line options
 * @param {string} args.url URL to run Lighthouse on
 * @param {string} args.output Output format. Supports HTML, JSON, and csv. Default is HTML.
 * @example beacon-for-ibm-dotcom --url "https://example.com" --output json
 * @returns {*} Raw output as a string if --raw is passed, otherwise outputs to stdout.
 */
module.exports = (args) => {
  return Promise.resolve(runLightHouse(args));
};

/**
 * Runs Lighthouse on the given URL and outputs the results in the given format.
 *
 * @param {object} args Command line options
 * @returns {string} Raw output as a string if --raw is passed, otherwise outputs to stdout.
 */
async function runLightHouse(args) {
  try {
    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--disable-dev-shm-usage'],
    });
    const options = {
      logLevel: 'info',
      output: args.output ? args.output : 'html',
      port: chrome.port,
    };
    const runnerResult = await lighthouse(args.url, options, config);

    // `.report` is the outputted report.
    const report = await runnerResult.report;

    await chrome.kill();

    if (args.raw) {
      return await report;
    } else {
      fs.writeFileSync(`beacon.report.${options.output}`, report);
    }

    // `.lhr` is the Lighthouse Result as a JS object
    console.log('Report is done for', runnerResult.lhr.finalUrl);
  } catch (err) {
    console.log(err);
  }
}

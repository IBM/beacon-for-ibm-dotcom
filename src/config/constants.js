/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const path = require('path');

/**
 * @constant Set paths for audits and gatherers.
 * @ignore
 */
const AUDIT_PATH = path.join(__dirname, '../audits');
const GATHERER_PATH = path.join(__dirname, '../gatherers');

const paths = {
  audit: AUDIT_PATH,
  gatherer: GATHERER_PATH,
};

module.exports = {
  paths,
};

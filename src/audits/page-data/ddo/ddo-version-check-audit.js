/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const Audit = require('lighthouse').Audit;
const fetch = require('node-fetch');
const constants = require('../../../config/constants');
const i18n = require(constants.paths.i18n);

const UIStrings = {
  title: 'This page is using the latest version of Carbon for IBM.com.',
  failureTitle:
    'This page is not using the latest version of Carbon for IBM.com.',
  description:
    'All Beacon audits are designed to run on the latest version of Carbon for IBM.com. If you are running audits against older versions, some audits may fail or they may give incomplete or inaccurate information. Keeping up with the latest version gives you access to the latest fixes and enhancements. Releases are non-breaking, unless noted otherwise.',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

// Get latest version of Carbon for IBM.com
let latestVersion;
fetch(
  'https://api.github.com/repos/carbon-design-system/carbon-for-ibm-dotcom/releases/latest'
)
  .then((response) => response.json())
  .then((data) => (latestVersion = data.name));

/**
 * @file Audits if page is using the latest stable version of Carbon for IBM.com.
 */
class DDOAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'ddo-version-check-audit',
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['CheckDDO'],
    };
  }

  /**
   * @param {object} artifacts Audit artifacts
   * @returns {*} Audit artifacts
   */
  static audit(artifacts) {
    const loadMetrics = artifacts.CheckDDO.page.pageInfo.version;
    const hasVersion = typeof loadMetrics !== 'undefined';
    const versionDiff =
      latestVersion.split('v')[1] !== loadMetrics.split('v')[1];

    // binary scoring
    const score = !versionDiff ? 1 : 0;
    const displayString = versionDiff
      ? `The latest version of Carbon for IBM.com is ${latestVersion}. This page is using ${loadMetrics}.`
      : '';

    return {
      rawValue: hasVersion,
      score: Number(score),
      displayValue: displayString,
    };
  }
}

module.exports = DDOAudit;

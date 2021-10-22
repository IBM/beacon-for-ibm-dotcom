/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const Audit = require('lighthouse').Audit;
const constants = require('../../config/constants');
const i18n = require(constants.paths.i18n);

const UIStrings = {
  title: 'The link to IBM Accessibility is included on the page.',
  failureTitle: 'The link to IBM Accessibility is missing.',
  description:
    'The link to IBM Accessibility is automatically included as part of the IBM Footer component. You must use the Carbon for IBM.com Footer component to ensure this and all footer links are included on the page. [Learn more](https://www.ibm.com/standards/carbon/components/footer).,
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

/**
 * @file Audits if page contains the `Accessibility` link in the `footer` component.
 */
class LegalLinksAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'accessibility-link-audit',
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['CheckLegalLinks'],
    };
  }

  /**
   * @param {object} artifacts Audit artifacts
   * @returns {*} Audit artifacts
   */
  static audit(artifacts) {
    const loadMetrics = artifacts.CheckLegalLinks.filter((link) => {
      return link.dataAutoid === 'dds--footer-legal-nav__link-accessibility';
    });

    const hasAccessibility = loadMetrics.length !== 0;

    // binary scoring
    const score = hasAccessibility ? 1 : 0;

    return {
      rawValue: hasAccessibility,
      score: Number(score),
    };
  }
}

module.exports = LegalLinksAudit;

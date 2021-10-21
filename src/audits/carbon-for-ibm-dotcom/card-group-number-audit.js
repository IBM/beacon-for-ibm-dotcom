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
  title: 'The Carbon for IBM.com Card group component is using the recommended number of cards.',
  failureTitle:
    'The Carbon for IBM.com Card group component is not using the recommended number of cards.',
  description:
    'The Card group component has a recommended minimum and maximum number of cards to be included. [Learn more](https://www.ibm.com/standards/web/carbon-for-ibm-dotcom/components/card-group).',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

const minCardTotal = 2;
const maxCardTotal = 6;

/**
 * @file Audits the recommended number of items in the `card-group` component.
 */
class CarbonForIBMDotcomAudit extends Audit {
  /**
   * @returns {*} {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: 'card-group-number-audit',
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['CheckComponents'],
    };
  }

  /**
   * @param {object} artifacts Audit artifacts
   * @returns {*} Audit artifacts
   */
  static audit(artifacts) {
    const loadItems = artifacts.CheckComponents.filter((link) => {
      return link.dataAutoid === 'dds--card-group-item';
    });

    if (!loadItems[0]) {
      return {
        notApplicable: true,
        score: Number(0),
      };
    }

    const totalItems = loadItems.length;

    // binary scoring
    const score =
      minCardTotal <= totalItems && totalItems <= maxCardTotal ? 1 : 0;

    return {
      rawValue: totalItems,
      score: Number(score),
    };
  }
}

module.exports = CarbonForIBMDotcomAudit;

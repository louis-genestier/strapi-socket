'use strict';
const uuid = require('uuid');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate(data) {
      data.unique_id = uuid.v4();
    }
  }
};

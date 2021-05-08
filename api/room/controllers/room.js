'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOneByUniqueId(ctx) {
    const { unique_id } = ctx.params;

    return await strapi.query('room', '').findOne({ unique_id })
  }
};

'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sup-response.sup-response', ({ strapi }) => ({
  async find(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('Unauthorized');
    }
    let filters = ctx.query.filters || {};
    if (!user.role || user.role.name !== 'Admin') {
      filters.ui = { $eq: user.id };
    }
    ctx.query.filters = filters;
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
}));

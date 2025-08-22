'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sup.sup', ({ strapi }) => ({
  async find(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('unauthorized');
    }
    let filters = ctx.query.filters || {};
    if (!user.role || user.role.name !== 'Admin') {
      filters.ui = { $eq: user.id }; 
    }
    ctx.query.filters = filters;
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('Unauthorized');
    }
    const requestData = ctx.request.body.data;
    if (!user.role || user.role.name !== 'Admin') {
      requestData.ui = user.id;
    }
    ctx.request.body.data = requestData;
    const { data, meta } = await super.create(ctx);
    return { data, meta };
  }
}));



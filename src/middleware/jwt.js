import jwt from 'koa-jwt';

module.exports = jwt({ secret: process.env.JWT_SECRET }).unless({ path: [/^\/public/] });
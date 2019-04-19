import Router from 'koa-router';

const router = new Router();

router.get('/sync', async (ctx) => {
  const sq = ctx.orm();
  const User = ctx.orm().user;

  sq.sync({ force: true })
  .then(() => User.create({
    name: 'Chuck',
    email: 'chuck@mail.com',
    birthday: new Date(1980, 6, 20)
  }));

  ctx.status = 200;
});

router.get('/sync/sales', async (ctx) => {
  const sq = ctx.orm();
  const Sales = ctx.orm().sales;

  sq.sync({force: true})  
  .then(() =>  Sales.create({
      provider_id: 3049,
      client_id: 493,
      price: 1600,
      created: new Date("2018-09-12 10:32:13")
  }))
  .then(() =>  Sales.create({
      provider_id: 3495,
      client_id: 540,
      price: 1200,
      created: new Date("2018-09-16 11:32:27")
  })) 
  .then(() =>  Sales.create({
      provider_id: 5444,
      client_id: 493,
      price: 1000,
      created: new Date("2018-10-14 13:32:16")
  })) 
  .then(() =>  Sales.create({
      provider_id: 3049,
      client_id: 493,
      price: 1400,
      created: new Date("2018-10-12 10:32:13")
  })) 
  .then(() =>  Sales.create({
      provider_id: 3495,
      client_id: 540,
      price: 1650,
      created: new Date("2018-10-16 11:32:27")
  }))
  .then(() =>  Sales.create({
      provider_id: 5444,
      client_id: 124,
      price: 1100,
      created: new Date("2019-01-14 13:32:16")
  }))  
  .then(() =>  Sales.create({
      provider_id: 3495,
      client_id: 453,
      price: 1900,
      created: new Date("2019-02-16 11:32:27")
  })) 
  .then(() =>  Sales.create({
      provider_id: 5444,
      client_id: 123,
      price: 900,
      created: new Date("2019-03-14 13:32:16")
  }));

  ctx.status = 200;
});

const routes = router.routes();
export default () => routes;

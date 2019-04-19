import Router from 'koa-router';
import jsonwebtoken from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const router = new Router({
    prefix: '/public'
});

router.get('/sales-report', async (ctx) => {
    const Sales = ctx.orm().sales;
    await ctx.orm()
    .query('SELECT YEAR(created) AS year, MONTH(created) as month, \
        SUM(price) as sum FROM sales GROUP BY YEAR(created), MONTH(created)', 
    { model: Sales })
    .then(results => {
        ctx.status = 200;
        ctx.body = {
            "status": '200',
            "msg": "Report info",
            "data": results
        }
    })
});

router.post('/login', async (ctx) => {
    const User = ctx.orm().user;

    ctx.checkBody('email').notEmpty().isEmail("your email is not valid.");
    ctx.checkBody('name').notEmpty().len(1, 45, "Your name's length is not valid");

    if (ctx.errors) {
        ctx.status = 200;
		ctx.body = {
            "message": "Validation Failed",
            "errors": ctx.errors
        };
		return;
    }

    await User.findAll({
        where: {
            name: ctx.request.body.name,
            email: ctx.request.body.email,
        },
        limit: 1       
    }).then(user => {
        if(user) {
            ctx.status = 200;
            user = JSON.parse(JSON.stringify(user))[0];
            //TO-DO Maybe set an expiration should be a good idea
            ctx.body = {
                token: jsonwebtoken.sign({
                    data: user,
                }, secret)
            }
        } else {
            ctx.status = 404;
        }
    });

});

const routes = router.routes();
export default () => routes;

import Router from 'koa-router';
import jwt from '../middleware/jwt';

const router = new Router({
    prefix: '/user'
});

//Create a new user
router.post('/', async (ctx) => {    
    const User = ctx.orm().user;

    ctx.checkBody('email').notEmpty().isEmail("your email is not valid.");
    ctx.checkBody('name').notEmpty().len(1, 45, "Your name's length is not valid");
    ctx.checkBody('birthday').notEmpty().match(/^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/g, "The birthday should have this format [yyyy/mm/dd]");
    
    if (ctx.errors) {
        ctx.status = 200;
		ctx.body = {
            "message": "Validation Failed",
            "errors": ctx.errors
        };
		return;
    }

    const birthday = new Date(ctx.request.body.birthday); 
    
    await User.create({ 
        name: ctx.request.body.name,
        email: ctx.request.body.email,
        birthday: birthday
    }).then(user => {
        ctx.status = 200;
        ctx.body = {
            "status": "200",
            "msg": `The user ${user.name} has been correctly saved with id ${user.id}`
        }
    });
});

//Delete a user
router.delete('/:id', async (ctx) => {
    const User = ctx.orm().user;

    ctx.checkParams('id').isInt("The parameter should be a number");

    if (ctx.errors) {
		ctx.status = 200;
		ctx.body = {
            "message": "Validation Failed",
            "errors": ctx.errors
        };
		return;
    }
    
    await User.destroy({
        where: {
            id: ctx.params.id
        }
    }).then(user => {
        if(!!+user) {
            ctx.status = 200;
            ctx.body = {
                "status": "200",
                "msg": `The user with id ${ctx.params.id} has been correctly deleted`
            }
        } else {
            //We should not tell if the user exists or not for security reasons but it can be handled
            ctx.status = 404;
        }
    });

});

//Update a user
router.put('/:id', jwt, async (ctx, next) => {
    const User = ctx.orm().user;
    
    ctx.checkParams('id').isInt("The parameter should be a number");

    ctx.checkBody('email').optional().isEmail("your email is not valid.");
    ctx.checkBody('name').optional().len(1, 45, "Your name's length is not valid");
    ctx.checkBody('birthday').optional().match(/^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/g, "The birthday should have this format [yyyy/mm/dd]");

    if (ctx.errors) {
		ctx.status = 200;
		ctx.body = {
            "message": "Validation Failed",
            "errors": ctx.errors
        };
		return;
    }
        
    await User.update(ctx.request.body, 
    {
        where: {
            id: ctx.params.id
        }
    }).then(user => {
        ctx.status = 200;
        ctx.body = {
            "status": "200",
            "msg": `The user with id ${ctx.params.id} has been correctly updated`
        }
    });

});

const routes = router.routes();

export default () => routes;

import compose from 'koa-compose';

//If we choose to ask for a token not only in update but in every user endpoint
//We can add the middleware after sync and before user and then every endpoint in user would ask for a token
//import jwt from '../middleware/jwt';

import user from './user';
import sync from './sync';
import publicEndpoints from './public';

export default () => compose([
  publicEndpoints(),
  sync(),
  user(),
]);

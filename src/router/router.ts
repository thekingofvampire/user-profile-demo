import { createRouter, createWebHashHistory } from 'vue-router';

import indexRouter from './index/index';
import userRouter from './user/user';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...indexRouter, ...userRouter],
});

export default router;

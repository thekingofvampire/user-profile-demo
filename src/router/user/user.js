const userRouter = [
  {
    path: '/user',
    // component:
    redirect: '/user/profile',
    children: [
      {
        path: '/user/profile',
        component: () => import('../../pages/user/user-profile.vue'),
      },
    ],
  },
];

export default userRouter;

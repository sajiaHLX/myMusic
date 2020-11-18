import Home from '@page/findMusic';
import MyMusic from '@page/myMusic';

let routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    childRoutes: [
      {
        // path: '/',
        // component: 'Home',
      }
      // {
      //     path: 'inbox',
      //     component: Inbox,
      //     childRoutes: [
      //         { path: '/messages/:id', component: Message },
      //         {
      //             path: 'messages/:id',
      //             onEnter: function (nextState, replaceState) {
      //                 replaceState(null, '/messages/' + nextState.params.id)
      //             }
      //         }
      //     ]
      // }
    ],
  },
  {
    path: '/myMusic',
    component: MyMusic
  },
];
export default routes;
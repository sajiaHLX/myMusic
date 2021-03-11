import { RouteProps } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import Home from '@page/findMusic';
import MyMusic from '@page/myMusic';
import HomePage from '@page/homePage';

export interface RouteConfigProps extends RouteProps {
  route: string;
  component?: React.ComponentClass | React.FC<RouteComponentProps | any>;
  children?: RouteConfigProps[];
  redirect?: string;
}

export let routes = [
  {
    route: '/',
    component: HomePage,
    exact: true,
    children: [
      // {
        // path: '/',
        // component: 'Home',
      // }
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
    route: '/myMusic',
    component: MyMusic
  },
];
// export default routes;
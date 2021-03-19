import { RouteProps } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import Home from '@page/findMusic';
import MyMusic from '@page/myMusic';
import HomePage from '@page/homePage';
import HomePageBody from '@page/homePageBody';

export interface RouteConfigProps extends RouteProps {
  route: string;
  component?: React.ComponentClass | React.FC<RouteComponentProps | any>;
  children?: RouteConfigProps[];
  redirect?: string;
}

export const routes = [
  {
    route: '/',
    component: HomePage,
    exact: true,
    children: [
      {
        route: '/',
        component: HomePageBody,
      }
    ],
  },
  {
    route: '/myMusic',
    component: MyMusic
  },
];
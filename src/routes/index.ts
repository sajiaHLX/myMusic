import { RouteProps } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import MyMusic from '@page/myMusic';
import HomePage from '@page/homePage';
import HomePageBody from '@page/homePageBody';
import PlayList from '@page/playList';
import Recommend from '@page/recommend';
import SongDetail from '@page/songDetail';
import SearchPage from '@page/searchPage';
import AlbumPage from '@page/album';
import Artist from '@page/artistPage';
import UserHome from '@page/user/home';

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
      },
    ],
  },
  {
    route: '/playlist',
    component: PlayList,
  },
  {
    route: '/discover/recommend/taste',
    component: Recommend,
  },
  {
    route: '/song',
    component: SongDetail,
  },
  {
    route: '/search',
    component: SearchPage,
  },
  {
    route: '/album',
    component: AlbumPage,
  },
  {
    route: '/artist',
    component: Artist,
  },
  {
    route: '/user/home',
    component: UserHome,
  },
  {
    route: '/myMusic',
    component: MyMusic,
  }
];
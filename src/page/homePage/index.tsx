import React from 'react';
import { Layout } from 'antd';
import MyHeader from '@components/Header';
import MyPlayBar from '@components/Playbar';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { Provider } from 'mobx-react';
import MusicList from '@store/musicList';
import { RouteConfigProps, routes } from '../../routes';
import './index.less'

interface IProps extends RouteComponentProps { }

const { Content } = Layout;
class App extends React.Component<IProps> {

  getRecursiveRoute = (routeConfigs: RouteConfigProps[], parentRoute: string = ''): any =>
    routeConfigs.map(config => {
      if (config.children) {
        return this.getRecursiveRoute(config.children, `${parentRoute}${config.route}`);
      }
      return config.redirect ? (
        <Redirect key={`${config.route}-${config.redirect}`} exact from={config.route} to={config.redirect} />
      ) : (
        <Route
          exact={config.exact}
          key={`${parentRoute}${config.route}`}
          path={`${parentRoute}${config.route}`}
          component={config.component}
        />
      );
    });

  render() {
    return (
      <Provider MusicList={MusicList}>
        <div className="App">
          <Layout>
            <MyHeader></MyHeader>
            <Content>
              <Switch>{this.getRecursiveRoute(routes as any)}</Switch>
            </Content>
            <MyPlayBar />
          </Layout>
          <div className="my-name-hlx">
            <span>made by Helinxiao</span>
          </div>
        </div>
      </Provider>
    )
  }
}

export default App;

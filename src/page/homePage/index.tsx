import React from 'react';
import { Layout } from 'antd';
import MyHeader from '@components/Header';
import MyPlayBar from '@components/Playbar';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RouteConfigProps, routes } from '../../routes';


const { Content } = Layout;
class App extends React.Component {

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
      <div className="App">
        <Layout>
          <MyHeader></MyHeader>
          <Content>
            <Switch>{this.getRecursiveRoute(routes)}</Switch>
          </Content>
          <MyPlayBar />
        </Layout>
      </div>
    )
  }
}

export default App;

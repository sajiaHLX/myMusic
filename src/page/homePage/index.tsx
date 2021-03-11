import React from 'react';
import Header from '../../components/Header';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { RouteConfigProps, routes } from '../../routes';
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
        <Header />
        <Switch>{this.getRecursiveRoute(routes)}</Switch>
      </div>
    )
  }
}

export default App;

import * as React from 'react';
import TopRecommendations from './topRecommendations';
import PersonalizedRecommendations from './personalizedRecommendations';
import NewCD from './newCD';
import TopList from './topList';
import './index.less'

export default class LeftBody extends React.Component {
  state = {
    token: window.localStorage.getItem('token'),
  }

  render() {
    return <div className="left-body-wrap">
      <TopRecommendations />
      {
        this.state.token ? <PersonalizedRecommendations /> : null
      }
      <NewCD />
      <TopList />
    </div>
  }
}
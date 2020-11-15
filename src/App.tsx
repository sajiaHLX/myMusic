import React from 'react';
import Header from './components/Header';
import './App.less';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Header />
        {/* <Route exact path="/" component={Home} />
          <Route path="/Page1/:name" component={Page1} />
          <Route path="/Page2" component={Page2} />
          <Route path="/Page3" component={Page3} /> */}
      </div>
    )
  }
}

export default App;

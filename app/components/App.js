import React from "react";
import Nav from "./Nav";
import Home from "./Home";
import Battle from "./Battle";
import Results from "./Results";
import Spinner from "./Spinner";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

class DynamicImport extends React.Component {
  state = {
    component: null
  };

  componentWillMount() {
    this.props.load().then(mod =>
      this.setState(() => ({
        component: mod.default
      }))
    );
  }

  render() {
    return this.props.children(this.state.component);
  }
}

const Popular = props => (
  <DynamicImport load={() => import("./Popular")}>
    {Component =>
      Component === null ? <h1>Loading</h1> : <Component {...props} />
    }
  </DynamicImport>
);

class App extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1000);
  }

  render() {
    const { loading } = this.state;
    if (loading === true) {
      return <Spinner />;
    }
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/battle/results" component={Results} />
            <Route path="/popular" component={Popular} />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;

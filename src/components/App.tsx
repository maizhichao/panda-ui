import React from "react";
import { Provider } from "react-redux";
import { store } from "store/configure-store";
import { Router } from "react-router-dom";
import { history } from "router";
import AppHeader from "./Header";
import Main from "components/Main";
import AppConfigurator from "./AppConfigurator";
import { Layout } from "antd";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppConfigurator>
        <Router history={history}>
          <Layout className="se-app">
            <AppHeader />
            <Main />
          </Layout>
        </Router>
      </AppConfigurator>
    </Provider>
  );
};

export default App;

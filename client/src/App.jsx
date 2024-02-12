import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { Outlet } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import "./App.css";

import Auth from "./utils/auth";

import Header from "./components/Header/index";
import Footer from "./components/Footer/index";

const { Sider } = Layout;

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout style={{ minHeight: '100vh'}}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/search">Search</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/thread">Thread</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <a href="#section" onClick={Auth.logout}>
                Logout
              </a>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="body">
          <Header />
          <Layout.Content style={{ margin: '24px 16px 0' }} className="outlet"> 
            <div style={{ padding: 24, background: '#bae0ff', minHeight: '100%' }}>
              <Outlet />
            </div>
          </Layout.Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </ApolloProvider>
  );
}

export default App;

import { Layout, Typography } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import React from 'react';
import './Login.scss';
export default function Login() {
  return (
    <Layout>
      <Header theme="light">App</Header>
      <Content>
        <div className="login-section-header">
          <h1>Login</h1>
          <a href="#">Don't have an account</a>
        </div>
      </Content>
    </Layout>
  );
}

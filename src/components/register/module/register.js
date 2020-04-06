import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import '../css/register.scss';
import DynamicModule from 'Tools/dynamic';

const { Content } = Layout;

const Account = DynamicModule({
  loader: () => import(/* webpackChunkName: "Account" */ './account'),
});
const Organization = DynamicModule({
  loader: () => import(/* webpackChunkName: "Organization" */ './organization'),
});
const Teacher = DynamicModule({
  loader: () => import(/* webpackChunkName: "Teacher" */ './teacher'),
});

export default class Register extends Component {
  constructor() {
    super();
    this.menuItemEvent = this.menuItemEvent.bind(this);
  }

  menuItemEvent({ key }) {
    const { path } = this.props.match;
    const history = this.props.history;
    if (key === '1') {
      history.push(`${path}/account`);
    } else if (key === '2') {
      history.push(`${path}/organization`);
    } else if (key === '3') {
      history.push(`${path}/teacher`);
    }
  }

  render() {
    const { path } = this.props.match;
    return (
      <Layout>
        <Menu mode="horizontal" onClick={this.menuItemEvent}>
          <Menu.Item key="1">
            <Icon type="user-add" />
            用户注册
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="solution" />
            机构注册
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="book" />
            教师注册
          </Menu.Item>
        </Menu>
        <Content
          style={{
            padding: '0 50px',
            marginTop: 18,
          }}
        >
          <Switch>
            <Route path={`${path}/account`} component={Account} />
            <Route path={`${path}/organization`} component={Organization} />
            <Route path={`${path}/teacher`} component={Teacher} />
          </Switch>
        </Content>
      </Layout>
    );
  }
}

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import DynamicModule from 'Tools/dynamic';

const { Content, Sider, Header, Footer } = Layout;

const Course = DynamicModule({
  loader: () => import(/* webpackChunkName: "Course" */ './course'),
});
const Knowledge = DynamicModule({
  loader: () => import(/* webpackChunkName: "Knowledge" */ './knowledge'),
});
const Exam = DynamicModule({
  loader: () => import(/* webpackChunkName: "Exam" */ './exam'),
});

export default class Center extends Component {
  constructor() {
    super();
    this.menuItemEvent = this.menuItemEvent.bind(this);
  }

  menuItemEvent({ key }) {
    const { path } = this.props.match;
    const history = this.props.history;
    if (key === '1') {
      history.push(`${path}/course`);
    } else if (key === '2') {
      history.push(`${path}/knowledge`);
    } else if (key === '3') {
      history.push(`${path}/exam`);
    } else if (key === '11') {
      history.push('/');
    }
  }

  render() {
    const { path } = this.props.match;
    return (
      <Layout>
        <Header
          style={{
            backgroundColor: '#fff',
            height: '48px',
          }}
        >
          <Row>
            <Col>
              <Menu
                mode="horizontal"
                style={{ border: '0' }}
                onClick={this.menuItemEvent}
              >
                <Menu.Item key="11">
                  <Icon type="home" />
                  首页
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            padding: '0 50px',
            marginTop: 18,
          }}
        >
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                onClick={this.menuItemEvent}
                mode="inline"
                style={{ height: '100%' }}
              >
                <Menu.Item key="1">
                  <Icon type="video-camera" />
                  <span>在线课堂</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="book" />
                  <span>知识点练习</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="desktop" />
                  <span>培训考核</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content
              style={{
                padding: '24px',
                minHeight: 280,
                background: '#fff',
              }}
            >
              <Switch>
                <Route path={`${path}/course`} component={Course} />
                <Route path={`${path}/knowledge`} component={Knowledge} />
                <Route path={`${path}/exam`} component={Exam} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>页尾</Footer>
      </Layout>
    );
  }
}

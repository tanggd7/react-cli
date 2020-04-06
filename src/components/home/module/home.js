import React, { Component } from 'react';
import { Layout, Menu, Icon, Row, Col, Carousel, Modal } from 'antd';
import '../css/home.less';
import Login from 'Components/session/module/login';

const { Header, Content } = Layout;
const { SubMenu, ItemGroup } = Menu;

export default class Home extends Component {
  constructor() {
    super();
    this.state = { visible: false };
    this.menuItemEvent = this.menuItemEvent.bind(this);
    this.hideLoginModal = this.hideLoginModal.bind(this);
  }

  menuItemEvent({ key }) {
    const history = this.props.history;
    if (key === '1') {
      this.setState({ visible: true });
    }
    if (key === '22') {
      history.push('/register');
    }
  }

  hideLoginModal() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <Layout>
        <Header
          style={{
            backgroundColor: '#fff',
            height: '48px',
          }}
        >
          <Row>
            <Col span={2} />
            <Col span={6}>
              <Menu
                mode="horizontal"
                style={{ border: '0' }}
                onClick={this.menuItemEvent}
              >
                <Menu.Item key="22">
                  <Icon type="user-add" />
                  注册
                </Menu.Item>
                <Menu.Item key="33">
                  <Icon type="mobile" />
                  手机版
                </Menu.Item>
              </Menu>
            </Col>
            <Col span={16}>
              <Menu
                mode="horizontal"
                style={{
                  border: '0',
                  float: 'right',
                }}
                onClick={this.menuItemEvent}
              >
                <Menu.Item key="1">
                  <Icon type="user" />
                  登录
                </Menu.Item>
                <Menu.Item key="2">教师登录</Menu.Item>
                <Menu.Item key="3">机构登录</Menu.Item>
                <SubMenu
                  title={
                    <span>
                      <Icon type="setting" />
                      设置
                    </span>
                  }
                >
                  <ItemGroup title="设置1">
                    <Menu.Item key="setting:1">项目1</Menu.Item>
                    <Menu.Item key="setting:2">项目2</Menu.Item>
                  </ItemGroup>
                  <ItemGroup title="设置2">
                    <Menu.Item key="setting:3">项目3</Menu.Item>
                    <Menu.Item key="setting:4">项目4</Menu.Item>
                  </ItemGroup>
                </SubMenu>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Content>
            <Carousel autoplay>
              <div>
                <h3>第1页</h3>
              </div>
              <div>
                <h3>第2页</h3>
              </div>
              <div>
                <h3>第3页</h3>
              </div>
              <div>
                <h3>第4页</h3>
              </div>
            </Carousel>
          </Content>
        </Layout>
        <Modal
          title="登录"
          visible={this.state.visible}
          onOk={this.hideLoginModal}
          onCancel={this.hideLoginModal}
          footer={null}
          width="400px"
        >
          <Login history={this.props.history} />
        </Modal>
      </Layout>
    );
  }
}

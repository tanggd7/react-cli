import React, { Component } from 'react';
import { Layout, Form, Input, Button } from 'antd';

const { Item } = Form;
const { Content } = Layout;

export default class Forget extends Component {
  render() {
    return (
      <Layout>
        <Content
          style={{
            padding: '0 50px',
            marginTop: 18,
          }}
        >
          <Form style={{ width: '250px' }}>
            <Item label="手机号">
              <Input />
            </Item>
            <Item label="验证码">
              <Input />
            </Item>
            <Item>
              <Button type="primary" htmlType="button">
                确定
              </Button>
            </Item>
          </Form>
        </Content>
      </Layout>
    );
  }
}

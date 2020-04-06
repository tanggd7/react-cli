import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

const { Item } = Form;

export default class Account extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Form style={{ width: '250px' }}>
        <Item label="姓名">
          <Input />
        </Item>
        <Item label="用户名">
          <Input />
        </Item>
        <Item label="密码">
          <Input type="password" />
        </Item>
        <Item>
          <div>
            <Button type="primary" htmlType="button">
              注册
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="dashed" htmlType="button">
              <Link to="/">返回</Link>
            </Button>
          </div>
        </Item>
      </Form>
    );
  }
}

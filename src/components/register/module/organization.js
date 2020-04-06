import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

const { Item } = Form;

export default class Organization extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Form style={{ width: '250px' }}>
        <Item label="机构名称">
          <Input />
        </Item>
        <Item label="用户名">
          <Input />
        </Item>
        <Item label="密码">
          <Input type="password" />
        </Item>
        <Item>
          <Button type="primary" htmlType="button">
            注册
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="dashed" htmlType="button">
            <Link to="/">返回</Link>
          </Button>
        </Item>
      </Form>
    );
  }
}

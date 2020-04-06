import React, { Component } from 'react';
import { Icon, Form, Button, Input, Checkbox } from 'antd';

const { Item } = Form;

export default class Login extends Component {
  constructor() {
    super();
    this.state = { visible: false };
    this.login = this.login.bind(this);
    this.forget = this.forget.bind(this);
  }

  login() {
    this.props.history.push('/center');
  }

  forget() {
    this.props.history.push('/forget');
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Item>
          <Input
            prefix={<Icon type="user" style={{ fontSize: 13 }} />}
            placeholder="用户名"
          />
        </Item>
        <Item>
          <Input
            prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
            type="password"
            placeholder="密码"
          />
        </Item>
        <Item>
          <Checkbox>记住我</Checkbox>
          <a className="login-form-forgot" onClick={this.forget}>
            忘记密码
          </a>
          <Button
            type="primary"
            htmlType="button"
            className="login-form-button"
            onClick={this.login}
          >
            {' '}
            登录
          </Button>
          或 <a>注册</a>
        </Item>
      </Form>
    );
  }
}

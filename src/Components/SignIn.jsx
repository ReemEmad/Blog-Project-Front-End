import React, { Component } from "react";
import { Form, Input, Checkbox, Modal, Button } from "antd";
import axios from "axios";
import jwtDecode from "jwt-decode";
class SignIn extends Component {
  state = {
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false,
    account: { username: "", password: "" },
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState(
      {
        ModalText: "The modal will be closed after two seconds",
        confirmLoading: true,
      },
      () => {
        if (this.state.confirmLoading) {
          setTimeout(() => {
            this.setState({
              visible: false,
              confirmLoading: false,
            });
          }, 2000);
        }
      }
    );
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false,
    });
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
  };

  onFinish = async (values) => {
    const { data: jwt } = await axios.post(
      "https://sampleblogmernapp.herokuapp.com/users/login",
      {
        username: values.username,
        password: values.password,
      }
    );
    localStorage.setItem("token", jwt);

    const userloggedIn = jwtDecode(jwt);
    localStorage.setItem("userObject", JSON.stringify(userloggedIn));

    this.props.history.push("/home");
    window.location.reload(true);
  };

  render() {
    const { visible, confirmLoading, account } = this.state;

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <div>
        <Button type="ghost" className="reg-button" onClick={this.showModal}>
          Sign In
        </Button>

        <Modal
          title="Sign in"
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email!",
                },
              ]}
            >
              <Input
                value={account.username}
                onChange={this.handleChange}
                name="username"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  min: 8,
                  message: "8 characters minimum",
                },
              ]}
            >
              <Input.Password
                value={account.password}
                onChange={this.handleChange}
                name="password"
              />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" onClick={this.handleOk}>
                Submit
              </Button>
            </Form.Item>
          </Form>
          {/* <p>{ModalText}</p> */}
        </Modal>
      </div>
    );
  }
}

export default SignIn;

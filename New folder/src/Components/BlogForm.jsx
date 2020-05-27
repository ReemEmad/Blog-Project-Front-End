import React, { Component } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
const apiEndpoint = "https://sampleblogmernapp.herokuapp.com/articles/";

class BlogForm extends Component {
  state = {
    articles: [],
  };
  async componentDidMount() {
    const { data: articles } = await axios.get(apiEndpoint);
    this.setState({ articles });
  }

  onFinish = async (values) => {
    console.log(values.img);
    const obj = {
      title: values.title,
      body: values.body,
      imgUrl: values.image,
      tags: values.tags,
      userId: this.props.user.userFound._id,
    };
    const { data: article } = await axios.post(apiEndpoint, obj);
    this.props.history.goBack();
    console.log(article);
  };

  onChange = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not validate email!",
        number: "${label} is not a validate number!",
        url: "${label} is not a valid url!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };

    const props = {
      name: "file",
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      headers: {
        authorization: "authorization-image",
      },
    };

    return (
      <Form
        id="home"
        {...layout}
        name="nest-messages"
        onFinish={this.onFinish}
        className="form"
        validateMessages={this.validateMessages}
      >
        <Row justify="center" align="top">
          <Col span="8">
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  min: 5,
                  max: 60,
                  message: "title is required!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center" align="top">
          <Col span="8">
            <Form.Item
              name="body"
              label="Blog Text"
              rules={[
                {
                  required: true,
                  min: 500,
                  max: 1000,
                  message: "body must be minimum 500 characters",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>

        {/* <Row justify="center" align="top">
          <Col span="8">
            <Form.Item
              name="author"
              label="Author"
              rules={[
                {
                  required: true,
                  message: "author is required!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row> */}

        <Row justify="center" align="top">
          <Col span="8">
            <Form.Item
              name="image"
              label="Image url"
              rules={[
                {
                  required: true,
                  message: "image is required!",
                },
              ]}
            >
              <Input type="url" />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center" align="top">
          <Col span="8">
            <Form.Item name="tags" label="Tags">
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center" align="top">
          <Col span="1">
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default BlogForm;

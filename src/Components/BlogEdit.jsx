import React, { Component } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
//const apiEndpoint = `http://localhost:4000/articles/${this.props.match.params.id}`;
const apiEndpoint = "https://sampleblogmernapp.herokuapp.com/articles/";
class BlogForm extends Component {
  state = {
    articles: [],
    isLoading: false,
  };
  data = "";

  async componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { data: articles } = await axios.get(
        `https://sampleblogmernapp.herokuapp.com/articles/${this.props.match.params.id}`
      );
      this.setState({ articles });
      this.data = this.state.data;
    }
    console.log(this.props.match.params.id);
    console.log(this.state.articles.title);
  }

  onFinish = async (values) => {
    const { data } = await axios.patch(apiEndpoint, {
      title: values.title,
      body: values.body,
      imgUrl: values.imgUrl,
      tags: values.tags,
    });
    console.log(data);
  };

  // onChange = (info) => {
  //   if (info.file.status !== "uploading") {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === "done") {
  //     message.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === "error") {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // };

  render() {
    console.log("this.props.name :>> ", this.props.name);
    console.log(this.state.articles);
    //  const { fieldValues } = { ...values };
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
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
      <React.Fragment>
        {this.state.articles.length && (
          <Form
            id="home"
            {...layout}
            name="nest-messages"
            onFinish={this.onFinish}
            className="form"
            // validateMessages={this.validateMessages}
          >
            <Row justify="center" align="top">
              <Col span="8">
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[
                    {
                      required: true,
                      max: 60,
                      message: "title is required!",
                    },
                  ]}
                >
                  <Input
                    defaultValue={
                      this.state.articles.title
                        ? this.state.articles.title
                        : this.data.title
                    }
                  />
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
                      max: 1000,
                      message: "body is required!",
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
                  label="Image"
                  rules={[
                    {
                      required: true,
                      message: "image is required!",
                    },
                  ]}
                >
                  <Upload {...props}>
                    <Button>
                      <UploadOutlined /> Click to Upload
                    </Button>
                  </Upload>
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
                    Edit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </React.Fragment>
    );
  }
}

export default BlogForm;

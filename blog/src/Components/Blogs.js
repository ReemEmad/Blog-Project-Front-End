import React, { Component } from "react";
import BlogPost from "../../src/Components/BlogPost";
//import Filter from "./Filter";
import Paginate from "./Pagination";
import axios from "axios";
import { Input, Pagination, Spin } from "antd";
import _ from "lodash";
import { AudioOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
export default class Blogs extends Component {
  state = {
    search: "",
    data: [],
    currentPage: 1,
    limit: 5,
    isLoading: true,
    totalData: 10,
  };

  getData = () => {
    axios
      .get(
        `https://sampleblogmernapp.herokuapp.com/articles?page=${this.state.currentPage}&limit=${this.state.limit}`
      )
      .then((response) => {
        this.setState({
          data: response.data.results,
          isLoading: false,
        });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
        });
        console.log(err);
      });
  };

  componentDidMount() {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        this.getData();
      }
    );
  }

  handleInputChange = (value) => {
    this.setState({ search: value.substr(0, 20) });
    const filtered = this.state.data.filter((post) => {
      return (
        post.title.toLowerCase().includes(value) || post.tags.includes(value)
      );
    });
    this.setState({ data: filtered });
  };

  onPageChange = (page) => {
    this.handlePageChange(page);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page }, () => {
      this.getData();
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      this.onPageChange(1);
    }
  };

  render() {
    const { Search } = Input;

    const { match } = this.props;
    const { isLoading, data, currentPage, limit, totalData } = this.state;
    return (
      <>
        <h1 id="h1-home">Welcome Home</h1>

        {/* Search */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "2%",
          }}
        >
          <Search
            onChange={this.handleSearch}
            placeholder="Title/Tags"
            onSearch={(value) => {
              this.handleInputChange(value);
            }}
            style={{
              width: 200,
              marginRight: "0",
            }}
          />
        </div>

        <div
          className="card-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "start",
            alignItems: "center",
            height: "auto",
            padding: "0% 10%",
            fontSize: "20px",
          }}
        >
          {isLoading ? (
            <Spin size="large" />
          ) : data.length != 0 ? (
            data.map((d) => {
              return (
                <div
                  className="card"
                  id="home"
                  style={{
                    flexBasis: "30%" /* space between columns */,
                    paddingLeft: "25px" /* layout each column */,
                    paddingRight: "25px",
                    // borderRadius: "30px",
                    // backgroundColor: "#f1f1f1",
                    margin: "20px",
                    width: "150px",
                  }}
                >
                  <br></br>
                  <Link to={`${match.url}/${d._id}`}>
                    <BlogPost
                      match={match}
                      key={d.id}
                      id={d._id}
                      title={d.title}
                      body={d.body.slice(0, 200)}
                      rest={d.body.slice(200)}
                      author={d.author}
                      img={d.imgUrl}
                      tags={d.tags}
                    ></BlogPost>
                  </Link>
                </div>
              );
            })
          ) : (
            <p>No Blogs Found</p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "2%",
          }}
        >
          <Pagination
            Current={currentPage}
            pageSize={limit}
            total={totalData}
            onChange={(page) => this.onPageChange(page)}
            style={{
              width: 200,
              marginRight: "0",
              paddingBottom: "2%",
            }}
          />
        </div>
      </>
    );
  }
}

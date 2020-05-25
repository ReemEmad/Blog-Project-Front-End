import React, { Component } from "react";
import BlogPost from "../../src/Components/BlogPost";
//import Filter from "./Filter";
import Paginate from "./Pagination";
import axios from "axios";
import { Input, Pagination } from "antd";
import _ from "lodash";
import { AudioOutlined } from "@ant-design/icons";

class Home extends Component {
  state = { search: "", data: this.props.data, nextPage: [] };

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data)
      this.setState({ data: this.props.data });
  }

  handleInputChange = (value) => {
    this.setState({ search: value.substr(0, 20) });
    const filtered = this.props.data.filter((post) => {
      return (
        post.title.toLowerCase().includes(value) || post.tags.includes(value)
      );
    });
    this.setState({ data: filtered });
  };

  handleBatee5 = (page) => {
    this.props.handlePageChange(page);
  };

  handleSearch = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      this.handleBatee5(1);
    }
  };

  render() {
    const { Search } = Input;

    return (
      <React.Fragment>
        <h1 id="h1">Blog Posts</h1>
        {/* Search */}
        <Search
          onChange={this.handleSearch}
          placeholder="Author/Title/Tags"
          onSearch={(value) => {
            this.handleInputChange(value);
          }}
          style={{ width: 200 }}
        />
        <div
          className="card-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            padding: "0% 3% 0% 3%",
            fontSize: "20px",
          }}
        >
          {this.state.data.length ? (
            this.state.data.map((d) => {
              return (
                <div
                  className="card"
                  id="home"
                  style={{
                    flexBasis: "30%" /* space between columns */,
                    paddingLeft: "25px" /* layout each column */,
                    paddingRight: "25px",
                    borderRadius: "30px",
                    backgroundColor: "#d3d3d3",
                    margin: "20px",
                    width: "350px",
                  }}
                >
                  <br></br>

                  <BlogPost
                    key={d.id}
                    id={d._id}
                    title={d.title}
                    body={d.body.slice(0, 200)}
                    rest={d.body.slice(200)}
                    author={d.author}
                    img={d.imgUrl}
                    tags={d.tags}
                  ></BlogPost>
                </div>
              );
            })
          ) : (
            <p>No matches</p>
          )}
        </div>

        <Pagination
          Current={this.props.currentPage}
          pageSize={this.props.limit}
          total={this.props.totalPages}
          onChange={(page) => this.handleBatee5(page)}
        />
      </React.Fragment>
    );
  }
}

export default Home;

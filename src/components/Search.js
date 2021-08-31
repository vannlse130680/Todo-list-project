import React, { Component } from "react";

class Search extends Component {
  state = {
    keyWord: "",
  };
  onChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onSearch = () => {
    this.props.onSearch(this.state.keyWord)
  };
  render() {
    return (
      <div>
        <div className="input-group mb-10">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập từ khóa ..."
            name="keyWord"
            value={this.state.keyWord}
            onChange={this.onChange}
          ></input>
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onSearch}
            >
              Tìm!
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default Search;

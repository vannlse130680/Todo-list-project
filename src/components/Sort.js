import React, { Component } from "react";

class Sort extends Component {
  onClick = (sortBy, sortValue) => {
    this.props.onSort(sortBy, sortValue)
  };
  render() {
    return (
      <div>
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Sắp xếp
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li onClick={this.onClick.bind(this, "name", 1)}>
              <i className="fas fa-sort-alpha-down"></i> Tên A-Z
            </li>
            <li onClick={this.onClick.bind(this, "name", -1)}>
              <i className="fas fa-sort-alpha-down-alt"></i> Tên Z-A
            </li>
            <li onClick={this.onClick.bind(this, "status", 1)}>Kích hoạt</li>
            <li onClick={this.onClick.bind(this, "status", -1)}>Ẩn</li>
            
          </ul>
        </div>
      </div>
    );
  }
}

export default Sort;

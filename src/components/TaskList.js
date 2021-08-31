import React, { Component } from "react";
import TaskItem from "./TaskItem";

class TaskList extends Component {
  state = {
    filterName: "",
    filterStatus: -1,
  };
  onChange = (event) => {
    let target = event.target
    let name = target.name
    let value = target.value
    this.props.onFilter(
      name === "filterName" ? value : this.state.filterName,
      name === "filterStatus" ? +value : +this.state.filterStatus
    )
    this.setState({
      [name] : value
    })
  }
  render() {
    let taskItem = this.props.tasks.map((item, index) => {
      return (
        <TaskItem
          key={item.id}
          index={index}
          item={item}
          onUpdateStatus={this.props.onUpdateStatus}
          onDelete={this.props.onDelete}
          onUpdate={this.props.onUpdate}
        ></TaskItem>
      );
    });
    return (
      <div>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  name="filterName"
                  className="form-control"
                  value={this.state.filterName}
                  onChange={this.onChange}
                />
              </td>
              <td>
                <select
                  name="filterStatus"
                  className="form-control"
                  
                  value={this.state.filterStatus}
                  onChange={this.onChange}
                >
                  <option value={-1}>Tất cả</option>
                  <option value={0}>Ẩn</option>
                  <option value={1}>Kích hoạt</option>
                </select>
              </td>
              <td></td>
            </tr>

            {taskItem}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TaskList;

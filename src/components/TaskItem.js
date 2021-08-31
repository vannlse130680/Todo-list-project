import React, { Component } from "react";

class TaskItem extends Component {
    onUpdateStatus = () => {
        
        this.props.onUpdateStatus(this.props.item.id)
    }
    onDelete = () => {
        this.props.onDelete(this.props.item.id)
    }
    onUpdate = () => {
      this.props.onUpdate(this.props.item.id)
  }
  render() {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>{this.props.item.name}</td>
        <td className="text-center ">
          {this.props.item.status ? (
            <span className="label label-danger" onClick={this.onUpdateStatus}>
              Kích hoạt
            </span>
          ) : (
            <span className="label label-success" onClick={this.onUpdateStatus}>
              Ẩn
            </span>
          )}
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
            <i className="fas fa-edit"></i> Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger" onClick={this.onDelete}>
            <i className="fas fa-trash-alt"></i> Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;

import React, { Component } from "react";

class TaskForm extends Component {
  state = {
    id: "",
    name: "",
    status: true,
  };
  componentDidMount() {
    if(this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status
      })
    }
  }
  componentWillReceiveProps(props) {
    console.log(props)
    if(props.task) {
      this.setState({
        id: props.task.id,
        name: props.task.name,
        status: props.task.status
      })
    } else {
      this.setState({
        id: "",
        name: "",
        status: true
      })
    }
    
   
  }
  onCloseForm = () => {
    this.props.onClose();
  };
  onChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value =
      target.value === "true"
        ? true
        : target.value === "false"
        ? false
        : target.value;
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear()
    this.onCloseForm()
  };
  onClear = () => {
      this.setState({
          name: "",
          status: true
      })
  }
  render() {
    return (
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">
             {this.state.id === '' ? "Thêm công việc" : "Cập nhật công việc"} 
              <i
                className="fas fa-window-close icon-close"
                onClick={this.onCloseForm}
              ></i>
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label className="left-lable">Tên :</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={this.onChange}
                  value={this.state.name}
                  placeholder="Input field"
                />
                <label className="left-lable">Trạng thái :</label>

                <select
                  name="status"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.status}
                >
                  <option value={true}>Kích hoạt</option>
                  <option value={false}>Ẩn</option>
                </select>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-warning">
                  <i className="fas fa-save"></i> Save
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={this.onClear}>
                  <i className="fas fa-window-close" ></i> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskForm;

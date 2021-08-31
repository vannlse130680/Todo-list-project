import "./App.css";

import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import Sort from "./components/Sort";

class App extends Component {
  state = {
    tasks: [],
    arr: [],
    isDisplayForm: false,
    taskEditting: null,
    filter: {
      name: "",
      status: -1,
    },
    keyWord: "",
    sort: {
      by: "name",
      value: 1,
    },
  };
  componentDidMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
        arr: tasks,
      });
    }
  }
  onGenerateData = () => {
    let tasks = [
      {
        id: this.generateID(),
        name: "Học lập trình ReactJS",
        status: true,
      },
      {
        id: this.generateID(),
        name: "Học lập trình Angular",
        status: true,
      },
      {
        id: this.generateID(),
        name: "Học lập trình VueJS",
        status: false,
      },
    ];

    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.componentDidMount();
  };

  generateID = () => {
    return Math.random().toString(36).substring(7);
  };
  onChangeDisplay = () => {
    this.setState({
      taskEditting: null,
      isDisplayForm: true,
    });
  };
  onCloseForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm,
    });
  };
  onSubmit = (submitValue) => {
    let tasks = this.state.arr;

    if (submitValue.id === "") {
      submitValue.id = this.generateID();
      tasks.push(submitValue);
    } else {
      let index = this.findIndex(submitValue.id);
      if (index !== -1) {
        tasks[index] = submitValue;
      }
    }
    this.setState({
      tasks: tasks,
      isDisplayForm: false,
      taskEditting: null,
      arr: tasks,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  onUpdateStatus = (id) => {
    let tasks = this.state.arr;
    let index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks,
        arr: tasks,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  findIndex = (id) => {
    let tasks = this.state.arr;
    let ind = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        ind = index;
      }
    });
    return ind;
  };

  onDelete = (id) => {
    let tasks = this.state.arr;
    let index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks,
        arr: tasks,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    this.onCloseForm();
  };

  onUpdate = (id) => {
    let tasks = this.state.arr;
    let index = this.findIndex(id);
    this.setState({
      taskEditting: tasks[index],
      isDisplayForm: true,
    });
  };
  onFilter = (filterName, filterStatus) => {
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    });
  };
  onSearch = (keyWord) => {
    this.setState({
      keyWord: keyWord,
    });
  };
  onSort = (sortBy, sortValue) => {
    this.setState({
      sort: {
        by: sortBy,
        value: sortValue,
      },
    });
  };
  render() {
    console.log(this.state.arr);

    if (this.state.filter) {
      this.state.tasks = this.state.arr.filter((params) => {
        return params.name.toLowerCase().indexOf(this.state.filter.name) !== -1;
      });
      if (this.state.filter.status > -1) {
        this.state.tasks = this.state.tasks.filter(
          ({ status }) => +status === this.state.filter.status
        );
      }
      if (this.state.keyWord) {
        this.state.tasks = this.state.tasks.filter((params) => {
          return params.name.toLowerCase().indexOf(this.state.keyWord) !== -1;
        });
      }
    }
    if (this.state.sort.by === "name") {
      this.state.tasks.sort((a, b) => {
        if (a.name > b.name) return this.state.sort.value;
        else if (a.name < b.name) return -this.state.sort.value;
        else return 0;
      });
    } else {
      
      this.state.tasks.sort((a, b) => {
        if (a.status > b.status) return -this.state.sort.value;
        else if (a.status < b.status) return this.state.sort.value;
        else return 0;
      });
    }

    return (
      <div className="App">
        <div className="text-center">
          <h1>Quản Lí Công Việc</h1>
        </div>

        <div className="row">
          {this.state.isDisplayForm ? (
            <TaskForm
              onClose={this.onCloseForm}
              onSubmit={this.onSubmit}
              task={this.state.taskEditting}
            ></TaskForm>
          ) : null}

          <div
            className={
              this.state.isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary mb-10"
              onClick={this.onChangeDisplay}
            >
              <i className="fas fa-plus"></i> Thêm công việc
            </button>
            <button
              type="button"
              className="btn btn-danger mb-10"
              onClick={this.onGenerateData}
            >
              Tạo data mẫu
            </button>
            <Control onSearch={this.onSearch} onSort={this.onSort}></Control>

            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={this.state.tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                ></TaskList>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

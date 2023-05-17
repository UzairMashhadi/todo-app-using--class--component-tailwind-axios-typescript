import React from "react";
import axios from "axios";

interface Todo {
  _id: string;
  title: string;
  status: boolean;
}

interface TodoListProps {
  item: Todo;
  newData: (data: Todo[]) => void;
}

class TodoList extends React.Component<TodoListProps> {
  handleUpdateStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { item } = this.props;
    const status = e.target.checked;
    axios
      .patch(
        `https://long-ruby-hatchling-shoe.cyclic.app/update/${item?._id}`,
        {
          status: status,
        }
      )
      .then(() => {
        this.handleGetTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDelete = () => {
    const { item } = this.props;
    axios
      .delete(`https://long-ruby-hatchling-shoe.cyclic.app/delete/${item?._id}`)
      .then(() => {
        this.handleGetTodos();
      })
      .catch((error) => {
        console.log("error--->", error);
      });
  };

  handleGetTodos = () => {
    axios
      .get("https://long-ruby-hatchling-shoe.cyclic.app/get-todo")
      .then((response) => {
        const data = response?.data?.todos;
        this.props.newData(data);
      })
      .catch((error) => {
        console.log("error--->", error);
      });
  };

  render() {
    const { item } = this.props;
    return (
      <div className="flex gap-3 justify-between items-center px-4 py-6 rounded-md bg-white shadow-md">
        <div className="flex gap-3 items-center">
          <input
            className="cursor-pointer min-w-[1.4rem] h-[1.4rem]"
            type="checkbox"
            checked={item?.status}
            onChange={this.handleUpdateStatus}
          />
          <h5
            className={`${
              item?.status && "line-through text-gray-400"
            } capitalize`}
          >
            {item?.title}
          </h5>
        </div>
        <button
          onClick={this.handleDelete}
          className="cursor-pointer bg-red-600 rounded-md px-3 py-2 text-xs text-white"
        >
          Delete
        </button>
      </div>
    );
  }
}

export default TodoList;

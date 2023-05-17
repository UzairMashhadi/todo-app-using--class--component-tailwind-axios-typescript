import axios from "axios";
import React, { Component } from "react";
import { Todo } from "../App";

interface Props {
  newData: (data: Todo[]) => void;
}

type State = {
  todo: string;
};

class AddTodo extends Component<Props, State> {
  state = {
    todo: "",
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("https://long-ruby-hatchling-shoe.cyclic.app/add-todo", {
        title: this.state.todo,
        status: false,
      })
      .then(() => {
        this.updateData();
      })
      .catch((error) => {
        console.log("error--->", error);
      });
    this.setState({ todo: "" });
  };

  updateData = () => {
    axios
      .get("https://long-ruby-hatchling-shoe.cyclic.app/get-todo")
      .then((response) => {
        this.props.newData(response.data?.todos);
      })
      .catch((error) => {
        console.log("error--->", error);
      });
  };

  render() {
    const { todo } = this.state;

    return (
      <div className="px-6 py-8 shadow-lg rounded-xl w-full mx-auto mt-8">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="block outline-none border border-gray-400 rounded h-9 w-full px-2"
            onChange={(e) => this.setState({ todo: e.target.value })}
            required
            value={todo}
          />
          <button
            type="submit"
            className="cursor-pointer mt-4 px-4 py-2 block mx-auto w-fit rounded font-semibold text-base leading-5 text-white bg-cyan-600"
          >
            Add Todo
          </button>
        </form>
      </div>
    );
  }
}

export default AddTodo;

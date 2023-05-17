import React from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import axios from "axios";

export interface Todo {
  _id: string;
  title: string;
  status: boolean;
}

interface AppState {
  data: Todo[];
  loading: boolean;
  error: boolean;
}

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    // const { loading, error } = this.state;
    this.setState({ loading: true });
    axios
      .get("https://long-ruby-hatchling-shoe.cyclic.app/get-todo")
      .then((response) => {
        this.setState({ data: response?.data?.todos });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log("error--->", error);
        this.setState({ error: true });
      });
  }

  handleNewData = (data: Todo[]) => {
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    const { loading, error } = this.state;
    return (
      <div className="max-w-[60rem] mx-auto px-5">
        <h1 className="my-10 text-center text-[2rem]">
          Todo App using Class Component with
          <br />
          (Tailwind, Axios and TypeScript)
        </h1>
        <AddTodo newData={this.handleNewData} />
        {loading ? (
          <div className="px-6 py-8 shadow-lg rounded-xl w-full mx-auto mt-8">
            <p className="text-xl text-center">Loading...</p>
          </div>
        ) : (
          data?.length === 0 &&
          !loading && (
            <div className="px-6 py-8 shadow-lg rounded-xl w-full mx-auto mt-8">
              <p className="text-xl text-center">No Todo Found!</p>
            </div>
          )
        )}
        {error && (
          <div className="px-6 py-8 shadow-lg rounded-xl w-full mx-auto mt-8">
            <p className="text-xl text-[red] text-center">Opps! Error</p>
          </div>
        )}
        <div className="grid grid-cols-3 gap-4 mt-10">
          {data?.map((item, index) => (
            <TodoList key={index} item={item} newData={this.handleNewData} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;

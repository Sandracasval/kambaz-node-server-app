let todos = [
  { id: 1, title: "Task 1", description: "description one", completed: false },
  { id: 2, title: "Task 2", description: "description two", completed: true },
  {
    id: 3,
    title: "Task 3",
    description: "description three",
    completed: false,
  },
  { id: 4, title: "Task 4", description: "description four", completed: true },
];

//best practice is to use query strings instead of path parameters when filtering items
//by properties other than the primary key
//the example refactors the getTodos function in case we want to filter the array by the
//completed query parameters

export default function WorkingWithArrays(app) {
  const getTodos = (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      //this converts true or false from completed into a boolean
      const completedBool = completed === "true";
      //filters by either completed=true or completed=false
      const completedTodos = todos.filter((t) => t.completed === completedBool);
      //sending the filtered array
      res.json(completedTodos);
      return;
    }
    //if no query parameter, then sand back the entire todolist
    res.json(todos);
  };
  // a route that creates a new item in the array and responds with the array now
  //containing the new item
  //this newTodo, creates deafulat values
  //the response consists of the entire newTodo
  const createNewTodo = (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  };

  //USING THE POST METHOD INSTEAD OF THE GET METHOD
  //reimplenting the route that creates newtodos
  //this grabs the JSON data from the request body and uses it to define newTodo
  //this version also doesnt respond with the entire todo array only the newly created todo body

  const postNewTodo = (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  };

  //retrieving data from a Server by Primary Key
  //econde it as a path parameter
  //the example below parses the ID as a path parameter, finds the corresponding item, a
  //responds with the item
  const getTodoById = (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  };
  //removing todo by id function
  const removeTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    //todoIndex is the position(index) of the todo we want to remove
    //1, stands for delete 1 item starting at that index
    todos.splice(todoIndex, 1);
    res.json(todos);
  };

  //adding the deleteTodo
  //New Version using the HTTP DELETE method
  //we are now respnding with the success status and let the user interface update its state variable
  const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    //findindex returns -1 if the item was not found
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }

    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  };

  //updating the TodoTitle
  const updateTodoTitle = (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = title;
    res.json(todos);
  };

  //update the completion status of the based on id

  const updateTodoCompleted = (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.completed = completed === "true";
    res.json(todos);
  };
  //update the description of the todo based on id
  const updateTodoDescription = (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.description = description;
    res.json(todos);
  };

  //new implementation of updateTodo
  //the route replaces the todo item whose ID matches the path parameter with a combination
  //of the original todo objects and properties in the req.body
  //this implementation does not respond with the todos array, but instead responds with a
  //simply OK status code of 200
  //t each is each individual todo in the erray
  const updateTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todos = todos.map((t) => {
      if (t.id === parseInt(id)) {
        return { ...t, ...req.body };
      }
      return t;
    });
    res.sendStatus(200);
  };

  app.put("/lab5/todos/:id", updateTodo);
  app.get("/lab5/todos/:id/description/:description", updateTodoDescription);
  app.get("/lab5/todos/:id/completed/:completed", updateTodoCompleted);
  app.get("/lab5/todos/:id/title/:title", updateTodoTitle);
  app.delete("/lab5/todos/:id", deleteTodo);
  app.get("/lab5/todos/:id/delete", removeTodo);
  app.get("/lab5/todos", getTodos);
  app.get("/lab5/todos/create", createNewTodo);
  app.post("/lab5/todos", postNewTodo);
  app.get("/lab5/todos/:id", getTodoById);
}

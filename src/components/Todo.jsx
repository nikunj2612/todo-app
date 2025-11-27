import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Divider, Input, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useDrop } from "react-dnd";
import CustomCard from "./CustomCard";
import { PiStarOfDavidDuotone } from "react-icons/pi";

// localStorage.setItem("todosLocal", JSON.stringify(todoList));
const todosLocal = JSON.parse(
  localStorage.getItem("todosLocal") || JSON.stringify([]),
);
console.log("local todos", todosLocal);

export function TodoList({
  todos,
  setTodos,
  title,
  status,
  moveTask,
  allTodo,
  setTodo,
}) {
  const getColor = (status) => {
    switch (status) {
      case 1:
        return "#ff7f75";
      case 2:
        return "orange";
      case 3:
        return "green";
      default:
        return "gray";
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  return (
    <div
      className='todo-status column'
      ref={drop}
      style={{
        minWidth: "200px",
        backgroundColor: isOver ? "#e1eeff" : "#eff3f8",
        height: "77vh",
        borderRadius: "10px",
      }}
    >
      <Card
        title={title}
        style={{
          border: "none",
          height: "calc(100vh - 280px)",
          backgroundColor: "inherit",
        }}
      >
        {todos &&
          todos.map((todo) => {
            return (
              <div
                className='todo-status column'
                key={todo.category_id}
                style={{ borderLeft: `3px solid ${getColor(todo?.status)}` }}
              >
                <CustomCard
                  category_id={todo.category_id}
                  title={todo?.name}
                  skills={todo?.skills}
                  status={todo?.status}
                  todos={todos}
                  setTodos={setTodos}
                  allTodo={allTodo}
                  setTodo={setTodo}
                />
              </div>
            );
          })}
      </Card>
    </div>
  );
}

export default function Todo() {
  const [todos, setTodos] = useState(todosLocal);
  const [isEditing, setIsEditing] = useState(false);
  const [todo, setTodo] = useState({
    category_id: uuidv4(),
    name: "",
    skills: [],
    status: 1,
  });
  const [status, setStatus] = useState(1);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    localStorage.setItem("todosLocal", JSON.stringify(todos));
  }, [todos]);

  const moveTask = (id, newStatus) => {
    console.log("[moveTask]", id, newStatus);
    setTodos((prevTasks) =>
      prevTasks.map((task) =>
        task.category_id === id ? { ...task, status: newStatus } : task,
      ),
    );
    setStatus(1);
  };

  function handleInput(e) {
    setTodo({
      category_id: !setIsEditing ? uuidv4() : todo.category_id,
      name: e.target.value,
    });
  }

  function addEditItem(e) {
    if (todo?.name == "") {
      alert("Please enter task.");
      return;
    }
    console.log("todo", todo, isEditing, e.target.value);
    if (!isEditing) {
      console.log("local TODO", todosLocal);
      setTodos([
        ...todos,
        {
          category_id: uuidv4(),
          name: todo.name,
          skills: skills,
          status: status ? Number(status) : 1,
        },
      ]);
      localStorage.setItem(
        "todosLocal",
        JSON.stringify([
          ...todos,
          {
            category_id: uuidv4(),
            name: todo.name,
            skills: skills,
            status: status ? Number(status) : 1,
          },
        ]),
      );
      console.log("local TODO", todosLocal);
      setTodo({ ...todo, name: "" });
      setStatus(1);
      setSkills([]);
    } else {
      console.log("up todos", todos, todo);
      const updatedTodos = todos.map((t) => {
        return t.category_id === todo.category_id ? todo : t;
      });
      setTodos(updatedTodos);
      localStorage.setItem("todosLocal", JSON.stringify(updatedTodos));
      setTodo({ ...todo, name: "" });
      setIsEditing(false);
      setStatus(1);
      setSkills([]);
    }
  }

  const handleChange = (value) => {
    setStatus(value);
  };

  const onChange = (checkedValues) => {
    setSkills(checkedValues);
    console.log("checked = ", checkedValues);
  };

  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      addEditItem(event);
    }
  };

  const skillOPtions = ["Product Sync", "Dev Team", "Tech", "Requirement"];
  const getTodosByStatus = (status) =>
    todos.filter((task) => task.status === status);

  return (
    <div>
      <h2 className='app-header-title'>
        <PiStarOfDavidDuotone style={{ color: "#1677ff" }} /> Daily Organizer
      </h2>
      <div className='button-header'>
        <>
          <div className='todo-header'>
            <Input
              onChange={handleInput}
              value={todo.name}
              placeholder='Enter your task'
              onKeyDown={(event) => handleKeyDown(event)}
            />
            <div className='todo-check-add'>
              <Checkbox.Group
                options={skillOPtions}
                defaultValue={skills}
                value={skills}
                onChange={onChange}
                style={{ display: "flex", alignItems: "center" }}
              />
              <div style={{ display: "flex", gap: "20px" }}>
                <Select
                  defaultValue='To Do'
                  value={status}
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: 1,
                      label: "To Do",
                    },
                    {
                      value: 2,
                      label: "Doing",
                    },
                    {
                      value: 3,
                      label: "Done",
                    },
                  ]}
                />
                <Button type='primary' onClick={(e) => addEditItem(e)}>
                  + Add Task
                </Button>
              </div>
            </div>
          </div>
        </>
      </div>
      <Divider />
      <div className='todos'>
        <TodoList
          todos={getTodosByStatus(1)}
          setTodos={setTodos}
          title='🎯 To Do'
          status={1}
          moveTask={moveTask}
          allTodo={todos}
          setTodo={setTodo}
        />
        <TodoList
          todos={getTodosByStatus(2)}
          setTodos={setTodos}
          title='🌟 Doing'
          status={2}
          moveTask={moveTask}
          allTodo={todos}
          setTodo={setTodo}
        />
        <TodoList
          todos={getTodosByStatus(3)}
          setTodos={setTodos}
          title='✅ Done'
          status={3}
          moveTask={moveTask}
          allTodo={todos}
          setTodo={setTodo}
        />
      </div>
    </div>
  );
}

import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, Drawer, Input, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { FaCheck, FaXmark, FaXmarksLines } from "react-icons/fa6";

export default function CustomCard({
  category_id,
  title,
  skills,
  status,
  todos,
  setTodos,
  allTodo,
  setTodo,
}) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: category_id, status: status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const getColor = (skill) => {
    switch (skill) {
      case "Product Sync":
        return "green";
      case "Dev Team":
        return "blue";
      case "Tech":
        return "orange";
      case "Requirement":
        return "red";
      default:
        return "gray";
    }
  };

  const deleteCategory = (id) => {
    console.log(id);
    console.log("[deleteCategory] --> todos", allTodo);
    const newTodos = allTodo.filter((t) => t.category_id != id);
    console.log("[deleteCategory] --> newTodos", newTodos);
    setTodos(newTodos);
    localStorage.setItem("todosLocal", JSON.stringify(newTodos));
  };

  const EditableTitle = ({ value, onChange, onBlur }) => {
    const [localValue, setLocalValue] = useState(value);
    const divRef = useRef(null);

    useEffect(() => {
      if (!isEditing) setLocalValue(value); // keep in sync when not editing
    }, [value, isEditing]);

    const handleInput = (e) => {
      const text = e.target.innerText;
      setLocalValue(text);
      onChange(text); // Notify parent on each input
    };

    const handleFocus = () => setIsEditing(true);

    const handleBlur = () => {
      setIsEditing(false);
      if (onBlur) onBlur();
    };

    return (
      <div
        ref={divRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          width: "100%",
          border: isEditing ? "1px solid blue" : "1px solid gray",
          padding: "4px",
          borderRadius: "4px",
          cursor: "text",
          outline: "none",
          minHeight: "24px",
        }}
      >
        {localValue}
      </div>
    );
  };

  const handleEdit = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.category_id === category_id) {
        return { ...todo, name: currentTitle };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todosLocal", JSON.stringify(updatedTodos));
    setIsEditing(false);
    setOpen(false);
  };

  return (
    <>
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
          padding: "10px",
          marginBottom: "20px",
        }}
        onClick={showDrawer}
      >
        <strong>{title}</strong>
        <div className='card-bottom'>
          <div>
            {skills?.length > 0 &&
              skills.map((skill, index) => (
                <Tag key={index} color={getColor(skill)}>
                  {skill}
                </Tag>
              ))}
          </div>
          <DeleteOutlined onClick={() => deleteCategory(category_id)} />
        </div>
      </div>
      <Drawer
        title={
          <div>
            <EditableTitle
              value={currentTitle}
              onChange={(val) => setCurrentTitle(val)}
              onBlur={() => {
                setIsEditing(false);
              }}
            />

            {isEditing && (
              <div
                style={{ display: "flex", gap: "5px", justifyContent: "end" }}
              >
                <Button
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  type='default'
                  shape='circle'
                  onClick={handleEdit}
                  danger
                  icon={<FaCheck />}
                />
                <Button
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setIsEditing(false);
                  }}
                  type='default'
                  shape='circle'
                  icon={<FaXmark />}
                />
              </div>
            )}
          </div>
        }
        onClose={onClose}
        open={open}
      >
        <div className='ticket-drawer-category'>
          <strong style={{ marginRight: "10px" }}>Categories : </strong>
          <div>
            {skills?.length > 0 &&
              skills.map((skill, index) => (
                <Tag key={index} color={getColor(skill)}>
                  {skill}
                </Tag>
              ))}
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "20px", gap: "10px" }}>
          <Avatar>N</Avatar>
          <Input placeholder='Write a comment' />
        </div>
      </Drawer>
    </>
  );
}

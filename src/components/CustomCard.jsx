import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Drawer, Input, Tag } from "antd";
import { useState } from "react";
import { useDrag } from "react-dnd";

export default function CustomCard({
  category_id,
  title,
  skills,
  status,
  todos,
  setTodos,
  allTodo,
}) {
  const [open, setOpen] = useState(false);

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
      <Drawer title={title} onClose={onClose} open={open}>
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

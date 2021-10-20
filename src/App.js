import React, { useState } from "react";
import Forms from "./Form";
import Item from "./Item.js";
import { v4 as uuidv4 } from "uuid";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const arr = () => {
  let data = localStorage.getItem("data");
  if (data) return JSON.parse(localStorage.getItem("data"));
  else return [];
};

export const App = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState();
  const [category, setCategory] = useState("");
  const [list, setList] = useState(arr);
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: uuidv4(),
      name,
      number,
      category,
    };
    if (name && name.length <= 15 && number.length <= 10 && !edit) {
      setList([...list, newItem]);

      setName("");
      setNumber("");
    } else if (
      name &&
      name.length <= 15 &&
      number &&
      number.length <= 10 &&
      edit &&
      editId
    ) {
      setList(
        list.map((el) => {
          if (el.id === editId) {
            return { ...el, name: name, number: number };
          }
          return el;
        })
      );
      setName("");
      setNumber("");
      setEditId(null);
      setEdit(false);
      setError("");
    } else if (!name) setError("Name cannot be blank.");
    else if (name.length > 15) setError("Character limit is 15.");
  };

  const filteredList = list.filter((el) =>
    el.name.toLowerCase().includes(search.toLowerCase())
  );

  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" style={{ padding: 10 }}>
        <Navbar.Brand href="#">PhoneBook</Navbar.Brand>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search Contact"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mr-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar>

      <Forms
        error={error}
        name={name}
        setName={setName}
        setNumber={setNumber}
        setCategory={setCategory}
        number={number}
        category={category}
        handleSubmit={handleSubmit}
      />

      <Item
        list={filteredList}
        setCategory={setCategory}
        setList={setList}
        setName={setName}
        setNumber={setNumber}
        setEdit={setEdit}
        setEditId={setEditId}
      />
    </>
  );
};
export default App;

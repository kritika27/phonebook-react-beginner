import { Button, Table, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Item = ({
  list,
  setCategory,
  setList,
  setName,
  setNumber,
  setEdit,
  setEditId,
}) => {
  const handleDelete = (id) => {
    setList(list.filter((el) => el.id !== id));
  };

  //Edit Todo
  const handleEdit = (id) => {
    const editItem = list.find((el) => el.id === id);
    setName(editItem.name);
    setNumber(editItem.number);
    setCategory(editItem.category);
    setEdit(true);
    setEditId(id);
  };

  return (
    <>
      <Container className="text-center">
        <div style={{ overflow: "scroll", height: "50vh" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {list
                .sort((a, b) =>
                  a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
                )
                .map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.number}</td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() => handleDelete(item.id)}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};
export default Item;

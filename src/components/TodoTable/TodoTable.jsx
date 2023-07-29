import { Space, Table, Input, Col, Spin } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllTodoQuery } from "../../api/TodoList/TodoList.api";
import AddTodoModal from "../AddTodo/AddTodoModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import UpdateModal from "../UpdateModal/UpdateModal";

const TodoTable = () => {
  const { isLoading, isError } = useGetAllTodoQuery();
  const { todo: tableData } = useSelector((state) => state.todo);
  const [searchText, setSearchText] = useState("");

  const columns = [
    {
      key: "1",
      title: "№",
      dataIndex: "key",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.key - b.key,
    },
    {
      key: "2",
      title: "Имя",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      key: "3",
      title: "Дата",
      dataIndex: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      key: "4",
      title: "Номер тел.",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
    },
    {
      key: "6",
      title: "Действие",
      dataIndex: "key",
      render: (id) => (
        <Space size={"small"}>
          <UpdateModal id={id} />
          <DeleteModal id={id} />
        </Space>
      ),
    },
  ];

  const filteredTableData = tableData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.date.toLowerCase().includes(searchText.toLowerCase()) ||
      item.phone.includes(searchText)
  );

  if (isLoading) return <Spin />;
  if (isError) return <p style={{color: 'red'}}>Ошибка</p>;
  return (
    <>
      <Col
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <AddTodoModal />
        <Input.Search
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16 }}
        />
      </Col>
      <Table
        pagination={false}
        columns={columns}
        dataSource={filteredTableData}
      />
    </>
  );
};

export default TodoTable;

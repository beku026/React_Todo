import { Button, DatePicker, Form, Input, Modal, Space, Spin } from "antd";
import { useState } from "react";
import { useAddTodoMutation } from "../../api/TodoList/TodoList.api";

// eslint-disable-next-line react/prop-types
const AddTodoModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addTodo, {isLoading}] = useAddTodoMutation();
  const [form] = Form.useForm(); 

  const handleChangeModalVisible = () => {
    setIsModalVisible((prev) => !prev);
  };

  const onSubmit = async (values) => {
    try {
      await addTodo(values);
      form.resetFields(); // Clear the form fields after successful submission
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <>
      <Button onClick={handleChangeModalVisible}>Добавить</Button>
      <Modal
        open={isModalVisible}
        onCancel={handleChangeModalVisible}
        footer={false}
        title="Добавить"
      >
        <Form onFinish={onSubmit}>
          <Form.Item name="name"> 
            <Input type="text" />
          </Form.Item>
          <Form.Item name='date'> 
            <DatePicker style={{width: '100%'}} showTime onOk={(e) => console.log(e)}/>
          </Form.Item>
          <Form.Item name="phone"> 
            <Input type="text" />
          </Form.Item>
          <Space direction="vertical" align={'center'} style={{width: '100%'}} >
            {isLoading ? <Spin/> : <></>}
            <Space direction="horizontal" align={'center'} style={{width: '100%'}} >
              <Button htmlType="submit">Добавить</Button>
              {!isLoading ? <Button key='btn' onClick={handleChangeModalVisible}>Закрыть</Button> : null}
            </Space>
          </Space>
        </Form>
      </Modal>
    </>
  );
};
  
export default AddTodoModal;
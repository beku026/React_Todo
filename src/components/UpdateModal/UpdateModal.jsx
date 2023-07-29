import { Button, DatePicker, Form, Input, Modal, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateTodoMutation } from "../../api/TodoList/TodoList.api";
import dayjs from 'dayjs'

// eslint-disable-next-line react/prop-types
const UpdateModal = ({ id }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateTodo, {isLoading}] = useUpdateTodoMutation();
  const tableData = useSelector((state) => state.todo.todo?.find((item) => item.key === id));
  const [formSet] = Form.useForm();


  const handleChangeModalVisible = () => {
    setIsModalVisible((prev) => !prev);
  };

  const onSubmit = (values) => {
    const updateObj = {...values, id}
    updateTodo(updateObj)
  };

  useEffect(() => {
    if (formSet && tableData) {
      const date = dayjs(tableData.date)
      formSet.setFieldsValue({...tableData, date });
    }
  }, [formSet, tableData]);

  return (
    <>
      <Button onClick={handleChangeModalVisible}>Редоктировать</Button>
      <Modal
        open={isModalVisible}
        onCancel={handleChangeModalVisible}
        footer={false}
        title="Вы действительно хотите редактировать эту строку"
      >
        <Form form={formSet} onFinish={onSubmit}>
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
              <Button htmlType="submit">Сохранить</Button>
              {!isLoading ? <Button key='btn' onClick={handleChangeModalVisible}>Закрыть</Button> : null}
            </Space>
          </Space>
        </Form>
      </Modal>
    </>
  );
};
  
  
export default UpdateModal;

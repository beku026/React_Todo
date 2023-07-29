import { Button, Modal } from "antd";
import { useState } from "react";
import { useDeleteTodoMutation } from "../../api/TodoList/TodoList.api";

// eslint-disable-next-line react/prop-types
const DeleteModal = ({id}) => {
  const [isModalVisible, setIsModaloVisible] = useState(false)
  const [remove] = useDeleteTodoMutation()


  const handleChangeModalVisible = () => {
    setIsModaloVisible(prev => !prev)
  }
  const deleteTodo = () => {
    try {
      remove(id)
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  }


  return (
    <>
      <Button onClick={handleChangeModalVisible}>Удалить</Button>
      <Modal 
        open={isModalVisible}  
        onCancel={handleChangeModalVisible}
        title='Вы действительно хотите это удалить'
        footer={[
          <Button key='1' onClick={handleChangeModalVisible}>Закрыть</Button>,
          <Button key='2' onClick={deleteTodo}>Удалить</Button>,
        ]}
      >

      </Modal>
    </>
  )
}

export default DeleteModal;
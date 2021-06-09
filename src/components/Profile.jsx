import { UserOutlined } from "@ant-design/icons";
import { Drawer, Button, Space, Avatar } from "antd";
import { useState } from "react";
import DbActions from "../firebase/DbActions";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const [visible, setVisible] = useState(false);
  const auth = useAuth();
  const db = DbActions();

  const showDrawer = () => {
    db.getUser(auth.user);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Space>
        <Button className="profile_btn" type="link" block onClick={showDrawer}>
          <Avatar src={db.userData?.photo || <UserOutlined /> } />
          Мій профіль
        </Button>
      </Space>
      <Drawer
        title="Мій профіль"
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
        key="left"
      >
        <p>{db.userData?.name}</p>
        <p>{db.userData?.age}</p>
        
        <Button block type="primary" onClick={() => auth.signout()}>
          Вихід
        </Button>
        <Button block onClick={() => db.deleteUser(db.userData)}>
          Видалити профіль
        </Button>
      </Drawer>
    </>
  );
}

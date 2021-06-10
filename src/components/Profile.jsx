import { UserOutlined } from "@ant-design/icons";
import { Drawer, Button, Space, Avatar } from "antd";
import { useState } from "react";
import { useDb } from "../firebase/dbActions";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const [visible, setVisible] = useState(false);
  const auth = useAuth();
  const db = useDb();

  const showDrawer = () => {
    db.getUser(auth.user)
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Space>
        <Button className="profile_btn" type="link" onClick={showDrawer} block>
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
        <p>{db.userData?.email}</p>
        
        <Button type="primary" onClick={() => auth.signout()} block >
          Вихід
        </Button>
        <Button 
          onClick={() => {
            db.deleteUser(auth.user)
            auth.signout()
          }}
          block
        >
          Видалити профіль
        </Button>
      </Drawer>
    </>
  );
}

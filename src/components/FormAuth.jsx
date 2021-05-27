import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Form, Input, Button, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function FormAuth() {
  const auth = useAuth();
  const [formtype, setFormtype] = useState("signin");

  function FormAction(values) {
    const { email, password } = values;

    if (formtype === "signin") {
      auth.signin(email, password);
      return;
    }
    if (formtype === "signup") {
      auth.signup(email, password);
      return;
    }
  }

  return (
    <>
      {auth.user && (
        <Button type="primary" htmlType="button" onClick={() => auth.signout()}>
          SignOUT
        </Button>
      )}
      {!auth.user && (
        <div className="form_block">
          <Title>{formtype === "signin" ? "SignIn" : "SignUp"}</Title>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={FormAction}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                type="email"
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                {formtype === "signin" ? "Login" : "Registration"}
              </Button>
              <Paragraph>
                <Text>Or</Text>
                <Button
                  type="link"
                  htmlType="button"
                  onClick={() =>
                    setFormtype(formtype === "signin" ? "signup" : "signin")
                  }
                >
                  {formtype === "signin" ? "SignUp" : "SignIn"}
                </Button>
              </Paragraph>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
}

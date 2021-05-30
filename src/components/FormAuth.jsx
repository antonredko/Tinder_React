import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Form, Input, Button, Typography, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function FormAuth() {
  const auth = useAuth();
  const [formtype, setFormtype] = useState("signin");

  function FormAction(values) {
    const { email, password } = values;

    if (formtype === "signin") {
      auth.signin(email, password);
    }
    if (formtype === "signup") {
      auth.signup(email, password);
    }
  }

  // const success = () => {
  //   message.success('This is a success message');
  // };

  const error = () => {
    message.error({
      content: auth.error.message,
    });
  };

  // const warning = () => {
  //   message.warning('This is a warning message');
  // };

  useEffect(() => {
    if (auth.error) {
      error();
    }
  }, [auth.error]);

  return (
    <>
      {!auth.user && (
        <div className="form_block">
          <Title>{formtype === "signin" ? "Вхід" : "Реєстрація"}</Title>
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
                  message: "Невалідний E-mail!",
                },
                {
                  required: true,
                  message: "Введіть E-mail!",
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
                  message: "Введіть пароль!",
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
                {formtype === "signin" ? "Увійти" : "Створити аккаунт"}
              </Button>
              <Paragraph>
                <Text>або</Text>
                <Button
                  type="link"
                  htmlType="button"
                  onClick={() =>
                    setFormtype(formtype === "signin" ? "signup" : "signin")
                  }
                >
                  {formtype === "signin" ? "Створити аккаунт" : "Увійти"}
                </Button>
              </Paragraph>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
}

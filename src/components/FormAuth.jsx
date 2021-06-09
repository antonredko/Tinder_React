import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Form, Input, Button, Typography, message } from "antd";
import { LockOutlined, MailOutlined, NumberOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function FormAuth() {
  const auth = useAuth();
  const [formtype, setFormtype] = useState("signin");

  function FormAction(values) {
    const { email, password, name, age } = values;
    
    if (formtype === "signin") {
      message.loading("Завантаження...", 1)
        .then(() => {
          auth.signin(email, password);
        });
      return;
    }
    if (formtype === "signup") {
      message.loading("Завантаження...", 1)
        .then(() => {
          auth.signup(email, password, { name: name, age: age, email: email });
        })
      return;
    }
  }

  useEffect(() => {
    if (auth.error?.message) {
      message.error(auth.error.message, 2);
    }
    if (auth.user) {
      message.success("Успішно!", 1);
    }
  }, [auth.error, auth.user]);

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
                  message: "Невалідний E-mail",
                },
                {
                  required: true,
                  message: "Введіть E-mail",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                autoFocus
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Введіть пароль",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Пароль"
              />
            </Form.Item>

            {formtype === "signup" && (
              <>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Введіть ім'я",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Ім'я"
                  />
                </Form.Item>
                <Form.Item name="age">
                  <Input
                    type="number"
                    prefix={<NumberOutlined className="site-form-item-icon" />}
                    placeholder="Вік"
                    min={0}
                  />
                </Form.Item>
              </>
            )}

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

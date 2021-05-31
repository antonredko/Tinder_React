import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Form, Input, Button, Typography, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export default function FormAuth() {
  const auth = useAuth();
  const [formtype, setFormtype] = useState("signin");

  function FormAction(values) {
    const { email, password, name, age } = values;

    if (formtype === "signin") {
      auth.signin(email, password);
      return;
    }
    if (formtype === "signup") {
      auth.signup(email, password, {name: name, age: age});
      return;
    }
  }

  const success = (errorMess) => {
    message.success(errorMess);
  };
  
  const error = (errorMess) => {
    message.error(errorMess);
  };
  
  // const warning = () => {
  //   message.warning('This is a warning message');
  // };

  useEffect(() => {
    if (auth.user && !auth.error) {
      if (formtype === "signin") {
        success(`Вхід успішний`)
      }
      if (formtype === "signup") {
        success(`Реєстрація успішна`)
      }
    }
    if (auth.error?.message) {
      error(auth.error.message)
    }
  }, [auth.error, auth.user])

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
                type="email"
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
                type="password"
                placeholder="Password"
              />
            </Form.Item>



            {formtype === "signup" && 
              <>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Введіть ім'я"
                    }
                  ]}
                >
                  <Input
                    // prefix={<MailOutlined className="site-form-item-icon" />}
                    type="text"
                    placeholder="Ім'я"
                  />
                </Form.Item>
                <Form.Item
                  name="age"
                  rules={[
                    {
                      required: true,
                      message: "Введіть вік"
                    }
                  ]}
                >
                  <Input
                    // prefix={<MailOutlined className="site-form-item-icon" />}
                    type="number"
                    placeholder="Вік"
                  />
                </Form.Item>
              </>}



            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                {formtype === "signin" ? "Увійти" : "Зареєструватися"}
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
                  {formtype === "signin" ? "Зареєструватися" : "Увійти"}
                </Button>
              </Paragraph>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
}

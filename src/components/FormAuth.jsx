import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

export default function FormAuth() {
  const auth = useAuth();
  const [formtype, setFormtype] = useState("signin");

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  function FormAction(event) {
    event.preventDefault();

    const { email, password } = event.target;

    if (formtype === "signin") {
      auth.signin(email.value, password.value);
      return;
    }
    if (formtype === "signup") {
      auth.signup(email.value, password.value);
      return;
    }
  }

  return (
    // <div className="form_block">
    //   {!auth.user && (
    //     <form className="from_auth" onSubmit={FormAction}>
    //       <button
    //         type="button"
    //         onClick={() =>
    //           setFormtype(formtype === "signin" ? "signup" : "signin")
    //         }
    //       >
    //         {formtype === "signin" ? "SignUp" : "SignIn"}
    //       </button>
    //       <input type="email" name="email" placeholder="Email" />
    //       <input type="password" name="password" placeholder="Password" />
    //       <button type="submit">
    //         {formtype === "signin" ? "Login" : "Registration"}
    //       </button>
    //     </form>
    //   )}
    // </div>

    <div className="form_block">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        {/* <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
                type: "email"
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item> */}

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
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
}
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

// Async Validation 异步验证
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const validate = (values) => {
  return sleep(300).then(() => {
    let errors = {};

    if (['admin', 'null', 'god'].includes(values.username)) {
      errors.username = 'Nice try';
    }

    // 自定義錯誤消息
    if (!values.username) {
      errors.username = '名字不能為空！';
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = '郵箱格式不正確！'
    }

    if (Object.keys(errors).length) {
      throw errors;
    }
  });
};

const Username = () => (
  <div>
    <h1>异步验证</h1>
    <Formik
      initialValues={{
        username: '',
        email: ''
      }}
      validate={validate}
      onSubmit={values => {
        sleep(500).then(() => {
          alert(JSON.stringify(values, null, 2));
        });
      }}
      render={({ errors, touched }) => (
        <Form>
          <div>
            <label htmlFor="username">Username</label>
            <Field name="username"
              placeholder="Jane Doe"
              type="text"
            />
            <ErrorMessage name="username" component="div" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field
              name="email"
              placeholder="jane@acme.com"
              type="email"
            />
            <ErrorMessage
              name="email"
              component="div"
            />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    />
  </div>
);

export default Username;

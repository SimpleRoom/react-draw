import React from 'react';
import { Formik, Field, Form } from 'formik';

const Basic = () => (
  <div>
    <h1>Basic</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      onSubmit={values => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
      render={() => (
        <Form>
          <ul>
            <li>
              <label htmlFor="firstName">First Name</label>
              <Field name="firstName" placeholder="Jane" />
            </li>
            <li>
              <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" placeholder="Doe" />
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <Field name="email" placeholder="jane@acme.com" type="email" />
            </li>
            <li>
              <button type="submit">Submit</button>
            </li>
          </ul>
        </Form>
      )}
    />
  </div>
);

export default Basic;
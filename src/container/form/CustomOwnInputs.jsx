import './formik-demo.css';
import React from 'react';
import { Field, ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
// Helper for the demo
import { DisplayFormikState } from './DisplayFormikState';

const Fieldset = ({ name, label, ...rest }) => (
  <React.Fragment>
    <div>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage name={name} />
    </div>
  </React.Fragment>
);

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required('First name is required.'),
    lastName: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required('Last name is required.'),
    age: Yup.number()
    .required('不能為空~')
    .max(3, '限3位數')
    .moreThan(0, '最小為1~')
    .lessThan(101, '不能超過100~')
    .positive('必須是大於1的'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),

  mapPropsToValues: ({ user }) => ({
    ...user,
  }),
  handleSubmit: (payload, { setSubmitting }) => {
    console.log(payload)
    alert(payload.email);
    setSubmitting(false);
  },
  displayName: 'MyForm',
});

const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null;

const Label = ({ error, className, children, ...props }) => {
  return (
    <label className="label" {...props}>
      {children}
    </label>
  );
};

const TextInput = ({ type, id, label, error, value, onChange, className, ...props }) => {
  const classes = classnames(
    'input-group',
    {
      'animated shake error': !!error,
    },
    className
  );
  return (
    <div className={classes}>
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
      <input
        id={id}
        className="text-input"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} />
    </div>
  );
};
const MyForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
  } = props;
  console.log(isSubmitting)
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        id="firstName"
        type="text"
        label="First Name"
        placeholder="John"
        error={touched.firstName && errors.firstName}
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="lastName"
        type="text"
        label="Last Name"
        placeholder="Doe"
        error={touched.lastName && errors.lastName}
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="age"
        type="number"
        maxLength="3"
        label="age"
        placeholder="15"
        error={touched.age && errors.age}
        value={values.age}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        error={touched.email && errors.email}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className="list">
        {
          values.list.length ? values.list.map(item =>
            <p key={item.id}>{item.name}</p>
          ) : null
        }
      </div>
      <div className="select">
        <Fieldset
          name="grade"
          label="grade"
          component="select"
        >
          <option value="">Select a Color</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </Fieldset>
      </div>
      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
      <DisplayFormikState {...props} />
    </form>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);

const List = [
  {
    id: 1,
    name: 'aaa',
  },
  {
    id: 2,
    name: 'bbb',
  }
]
class CustomOwnInputs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: List,
    }
  }
  render() {
    const { list } = this.state
    return (
      <div className="custom-own-inputs">
        <MyEnhancedForm user={{ email: '', firstName: '', lastName: '', age: '', list: list }} />
      </div>
    )
  }
}

export default CustomOwnInputs

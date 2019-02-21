import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// By combining a vanilla <label> plus Formik's <Field> and <ErrorMessage>,
// we can abstract a generic "Fieldset" component for most of our inputs.
const Fieldset = ({ name, label, ...rest }) => (
  <React.Fragment>
    <div>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage name={name} />
    </div>
  </React.Fragment>
);


class CustomiInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      config: {
        userName: '',
        userAge: '',
        email: '',
        color: '',
        website: '',
      }
    }
  }
  onSubmit = (values, formActions) => {
    setTimeout(() => {
      console.log(this, formActions, `提交了`)
      alert(JSON.stringify(values, null, 2));
    }, 500);
  }

  onInputChnage = (e) => {
    const targetInput = e.target
    const targetName = targetInput.getAttribute('name')
    const targetValue = targetInput.value
    this.onResetConfig(targetName, targetValue)
    console.log(targetName, targetValue, `當前輸入`)
  }

  onResetConfig = (name, value) => {
    let { config } = this.state
    config[name] = value
    this.setState({ config })
  }

  render() {
    const { config } = this.state
    return (
      <div>
        <h1>Sign Up 自定义输入</h1>
        <Formik
          initialValues={config}
          validationSchema={Yup.object().shape({
            userName: Yup.string()
              .min(2, '名字至少2個字')
              .max(4,'名字最多4個字'),
            userAge: Yup.number()
            .max(100, '最大年齡只能是100')
            .min(1, '最小只能是1'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            color: Yup.string().required('Required'),
            website: Yup.string()
              .url('Invalid URL')
              .required('Required'),
          })}
          onSubmit={this.onSubmit}
          render={({ isSubmitting, handleReset }) => (
            <Form>
              <Fieldset
                name="userName"
                type="text"
                label="userName"
                placeholder="你的名字"
                maxLength="4"
                onChange={this.onInputChnage}
              />
              <Fieldset
                name="userAge"
                type="number"
                label="userAge"
                placeholder="你的年齡"
                maxLength="3"
                onChange={this.onInputChnage}
              />
              <Fieldset
                name="email"
                type="email"
                label="Email"
                placeholder="jane@acme.com"
                onChange={this.onInputChnage}
              />
              <Fieldset
                name="color"
                label="Favorite Color"
                component="select"
              >
                <option value="">Select a Color</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </Fieldset>

              <Fieldset
                name="website"
                type="url"
                label="Website"
                placeholder="https://example.com"
              />

              <button
                type="reset"
                className="secondary"
                disabled={isSubmitting}
                onClick={handleReset}
              >
                Reset
            </button>
              <button type="submit">Submit</button>
            </Form>
          )}
        />
      </div>
    )
  }
}

export default CustomiInput

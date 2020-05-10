/**
 *
 * RegisterForm
 *
 */

import React, { useState } from 'react';
import { message, Checkbox, Input, Select } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrenciesAction } from '../../containers/RegisterPage/actions';

import {
  StyledSteps,
  StyledStep,
  StyledFormWrapper,
  StyledForm,
  StyledFormItem,
  StyledFormActionsWrapper,
  StyledInformation,
  StyledButton,
} from './RegisterForm.style';
import makeSelectRegisterPage from '../../containers/RegisterPage/selectors';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
const FirstName = () => (
  <StyledFormItem
    label="First name"
    name="firstname"
    rules={[
      {
        required: true,
        message: 'Please input your firstname!',
      },
    ]}
  >
    <Input placeholder="Enter first name" />
  </StyledFormItem>
);

const LastName = () => (
  <StyledFormItem
    label="Last name"
    name="lastname"
    rules={[
      {
        required: true,
        message: 'Please input your last name!',
      },
    ]}
  >
    <Input placeholder="Enter last name" />
  </StyledFormItem>
);

const Password = () => (
  <StyledFormItem
    label="Password"
    name="password"
    rules={[
      {
        required: true,
        message: 'Please input your password!',
      },
    ]}
  >
    <Input.Password placeholder="Enter password" />
  </StyledFormItem>
);

const Currency = () => {
  const { registerPage } = useSelector(stateSelector);
  const dispatch = useDispatch();

  return (
    <StyledFormItem label="Currency" name="gender" rules={[{ required: true }]}>
      <Select
        loading={registerPage.isLoading}
        onClick={() => dispatch(getCurrenciesAction())}
        placeholder="Select currency"
        allowClear
      >
        {registerPage.currencies.length &&
          registerPage.currencies.map((currency) => (
            <Select.Option key={currency.uuid} value={currency.uuid}>
              {currency.name}
            </Select.Option>
          ))}
      </Select>
    </StyledFormItem>
  );
};

const EmailAddress = () => (
  <>
    <StyledFormItem
      tail
      label="E-Mail address"
      name="email"
      rules={[
        { type: 'email', required: true, message: 'Please input your email!' },
      ]}
    >
      <Input placeholder="Enter e-mail address" />
    </StyledFormItem>

    <StyledFormItem checkbox name="remember" valuePropName="checked">
      <Checkbox>I consent to the processing of my personal data.</Checkbox>
    </StyledFormItem>

    <StyledInformation>
      Registration does not require confirmation by the email.
    </StyledInformation>
  </>
);

const steps = [
  {
    title: 'First name',
    content: <FirstName />,
  },
  {
    title: 'Last name',
    content: <LastName />,
  },
  {
    title: 'Password',
    content: <Password />,
  },
  {
    title: 'Currency',
    content: <Currency />,
  },
  {
    title: 'E-Mail Address',
    content: <EmailAddress />,
  },
];

const stateSelector = createStructuredSelector({
  registerPage: makeSelectRegisterPage(),
});

function RegisterForm() {
  const [current, setCurrent] = useState(0);

  return (
    <>
      <StyledSteps current={current}>
        {steps.map((item) => (
          <StyledStep key={item.title} title={item.title} />
        ))}
      </StyledSteps>

      <StyledFormWrapper>
        <StyledForm layout="vertical" name="register">
          <div>{steps[current].content}</div>
        </StyledForm>

        <StyledFormActionsWrapper>
          {current < steps.length - 1 && (
            <StyledButton
              type="primary"
              onClick={() => setCurrent(current + 1)}
            >
              Next <RightOutlined />
            </StyledButton>
          )}
          {current === steps.length - 1 && (
            <StyledButton
              type="primary"
              onClick={() => message.success('Processing complete!')}
            >
              Create an account
            </StyledButton>
          )}
          {current > 0 && (
            <StyledButton
              type="link"
              back="true"
              onClick={() => setCurrent(current - 1)}
            >
              <LeftOutlined /> Back
            </StyledButton>
          )}
        </StyledFormActionsWrapper>
      </StyledFormWrapper>
    </>
  );
}

RegisterForm.propTypes = {};

export default RegisterForm;
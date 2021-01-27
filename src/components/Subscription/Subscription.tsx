import React, { useState } from 'react';
import axios from 'axios';
import style from './Subscription.module.scss';
import Header from '../Header/Header';
import Input from '../Input/Input';
import Checkbox from '../Checkbox/Checkbox';
import IconSocial from '../IconSocial/IconSocial';
import { socials } from '../../data/SocialsData';
import {
  validateEmail,
  endsWithCo,
  getProvider,
} from '../../utils/email-functions';
import success from '../../assets/images/success.svg';

const validationMessage = {
  empty: 'Email address is required',
  invalid: 'Please provide a valid e-mail address',
  checkbox: 'You must accept the terms and conditions',
  colombia: 'We are not accepting subscriptions from Colombia emails',
  serverError:
    'There is a problem with the server, your subscription was unsuccessful. Please try again later.',
};

const Subsscription = () => {
  const [showForm, setShowForm] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [showError, setShowError] = useState(false);
  const [postError, setPostError] = useState(false);

  const submitForm = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    if (
      !inputValue ||
      !validateEmail(inputValue) ||
      !checkboxValue ||
      endsWithCo(inputValue)
    ) {
      setShowError(true);
    } else {
      setShowError(false);
      axios
        .post('http://localhost:8000/customers', {
          email: inputValue,
          provider: getProvider(inputValue),
        })
        .then(() => {
          setShowForm(false);
        })
        .catch(() => setPostError(true));

      setInputValue('');
      setCheckboxValue(false);
    }
  };

  const homeHandler = () => {
    setShowForm(true);
    setPostError(false);
  };

  return (
    <div className={style.wrapper}>
      <Header onClick={homeHandler} />
      <div className={style.content}>
        {showForm ? (
          <div>
            <div className="ml-36">
              <h1>Subscribe to newsletter</h1>
              <p className="mb-50">
                Subscribe to our newsletter and get 10% discount on pineapple
                glasses.
              </p>
            </div>
            <Input
              placeholder="Type your email address here…"
              onClick={submitForm}
              onChange={(event) => setInputValue(event.target.value)}
              inputValue={inputValue}
              disabled={
                showError &&
                (!inputValue ||
                  !validateEmail(inputValue) ||
                  !checkboxValue ||
                  endsWithCo(inputValue))
              }
            />
            {showError && (
              <div className={`mb-50 ${style.validation}`}>
                {!inputValue && <div>{validationMessage.empty}</div>}
                {inputValue && !validateEmail(inputValue) && (
                  <div>{validationMessage.invalid}</div>
                )}
                {inputValue && !checkboxValue && (
                  <div>{validationMessage.checkbox}</div>
                )}
                {inputValue &&
                  validateEmail(inputValue) &&
                  endsWithCo(inputValue) && (
                    <div>{validationMessage.colombia}</div>
                )}
              </div>
            )}
            {postError && (
              <div className={`mb-50 ${style.validation}`}>
                {validationMessage.serverError}
              </div>
            )}
            <div className="mb-50" />
            <Checkbox
              selected={checkboxValue}
              onChange={() => setCheckboxValue(!checkboxValue)}
            />
          </div>
        ) : (
          <div className="ml-36 mr-36">
            <img src={success} className={style.successIcon} alt="successful" />
            <h1>Thanks for subscribing!</h1>
            <p className="mb-50">
              You have successfully subscribed to our email listing. Check your
              email for the discount code.
            </p>
          </div>
        )}
        <div>
          <hr className={`mb-50 ${style.line}`} />
          <div className={style.socials}>
            {socials.map(({ name, path, path2, link }) => {
              return (
                <IconSocial
                  icon={path}
                  name={name}
                  icon2={path2}
                  link={link}
                  key={name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subsscription;

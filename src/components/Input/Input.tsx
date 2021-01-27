import React, { FC } from 'react';
import style from './Input.module.scss';

type Props = {
  placeholder: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  disabled: boolean;
};

const Input: FC<Props> = ({ placeholder, onClick, onChange, inputValue, disabled }) => {
  return (
    <form>
      <div className={style.form}>
        <div className={style.line} />
        <input
          className={style.input}
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          value={inputValue}
        />
        <button
          type="submit"
          className={style.button}
          onClick={onClick}
          disabled={disabled}
          name='subscribe'
        >
          <i className={`material-icons ${style.icon}`}>keyboard_backspace</i>
        </button>
      </div>
    </form>
  );
};

export default Input;

import React, { FC } from 'react';
import style from './Checkbox..module.scss';

type Props = {
  selected: boolean;
  onChange: () => void;
};

const Checkbox: FC<Props> = ({ selected, onChange }) => {
  return (
    <div className={`mb-50 ml-36 ${style.checkbox}`}>
      <input
        id="checkbox"
        type="checkbox"
        className={style.input}
        checked={selected}
        onChange={onChange}
      />
      <div className={style.newCheckbox}>
        <i className={`material-icons ${style.icon}`}>check</i>
      </div>
      <span className={style.label}>
        <label htmlFor="checkbox">I agree to </label>
        <a href="/#">terms of service</a>
      </span>
    </div>
  );
};

export default Checkbox;

import React, { FC } from 'react';
import style from './Hero.module.scss';

const Hero:FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.heroBg} />
    </div>
  );
};

export default Hero;

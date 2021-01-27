import React, { FC } from 'react';
import style from './IconSocial.module.scss';

type Props = {
  icon: string;
  icon2: string;
  name: string;
  link: string;
};

const IconSocial: FC<Props> = ({ icon, icon2, name, link }) => {
  return (
    <a href={link}>
      <div
        className={`${style.circle} 
        ${name === 'facebook' ? style.fb : ''} 
        ${name === 'instagram' ? style.ig : ''}
        ${name === 'twitter' ? style.tw : ''} 
        ${name === 'youtube' ? style.yt : ''}
      `}
      >
        <img src={icon} alt={name} className={style.img} />
        <img src={icon2} alt={name} className={style.img2} />
      </div>
    </a>
  );
};

export default IconSocial;

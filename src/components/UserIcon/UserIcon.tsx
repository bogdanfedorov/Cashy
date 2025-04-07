import React from "react";
import styles from "./UserIcon.module.sass";

interface UserIconProps {
  frameUrl: string;
  avatarUrl: string;
  level: number;
}

const getLevelClass = (level: number): string => {
  if (level >= 50) return "gold";
  if (level >= 20) return "silver";
  if (level >= 10) return "bronze";
  return "default";
};

const UserIcon: React.FC<UserIconProps> = ({ frameUrl, avatarUrl, level }) => {
  const levelClass = getLevelClass(level);

  return (
    <div className={styles.wrapper}>
      <img src={frameUrl} alt="frame" className={styles.frame} />
      <img src={avatarUrl} alt="avatar" className={styles.avatar} />
      <div className={`${styles.level} ${styles[`level--${levelClass}`]}`}>
        {level}
      </div>
    </div>
  );
};

export default UserIcon;

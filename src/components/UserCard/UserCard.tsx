import React from "react";
import styles from "./UserCard.module.sass";
import UserIcon from "../UserIcon/UserIcon";
import { scoreFormater } from "@/utils/formaters";

interface UserCardProps {
  frameUrl: string;
  avatarUrl: string;
  level: number;
  name: string;
  score: number;
  background?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  frameUrl,
  avatarUrl,
  level,
  name,
  score,
  background,
}) => {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: background ? `url(${background})` : undefined,
      }}
    >
      <UserIcon frameUrl={frameUrl} avatarUrl={avatarUrl} level={level} />
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.score}>{scoreFormater.format(score)}</span>
      </div>
    </div>
  );
};

export default UserCard;

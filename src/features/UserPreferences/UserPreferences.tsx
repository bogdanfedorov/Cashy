"use client";
import UserCard from "@/components/UserCard/UserCard";
import {
  BackgroundCardStatus,
  Background as BackgroundType,
  Player,
} from "@/types/shared";
import { coinFormater } from "@/utils/formaters";
import { useMutation, useQuery } from "@apollo/client";
import BackgraundIcon from "../../../public/icons/background.svg";
import ApplyedIcon from "../../../public/icons/check.svg";
import CoinIcon from "../../../public/icons/coin.svg";
import FrameIcon from "../../../public/icons/frame.svg";
import LockedIcon from "../../../public/icons/locked.svg";
import StickerIcon from "../../../public/icons/sticker.svg";
import styles from "./UserPreferences.module.sass";
import {
  BUY_BACKGROUND,
  CHANGE_BACKGROUND,
  GET_AVAILABLE_BACKGROUNDS,
  GET_PLAYER,
} from "./queries";
import client from "@/lib/apollo-client";
import { useBuyBackground } from "./useBuyBackground";
import { useChangeBackground } from "./useChangeBackground";

interface UserPreferencesProps {}

const UserPreferences: React.FC<UserPreferencesProps> = () => {
  const {
    data: playerData,
    loading: playerLoading,
    error: playerError,
  } = useQuery<{ player: Player }>(GET_PLAYER);
  const {
    data: backgroundsData,
    loading: backgroundsLoading,
    error: backgroundsError,
  } = useQuery<{ backgrounds: Array<BackgroundType> }>(
    GET_AVAILABLE_BACKGROUNDS,
  );

  const handleBuyBackground = useBuyBackground();
  const handleChangeBackground = useChangeBackground(
    playerData,
    backgroundsData,
  );
  if (playerError || backgroundsError) {
    return <p>playerError or backendError</p>;
  }
  if (playerLoading || backgroundsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.main}>
      <section role="heading" className={styles.header}>
        <h1>Edit My Style</h1>

        {playerData ? (
          <UserCard
            name={playerData.player.name}
            level={playerData.player.level}
            score={playerData.player.score}
            frameUrl={playerData.player.frameUrl}
            avatarUrl={playerData.player.avatarUrl}
            background={playerData.player.background}
          />
        ) : (
          <UserCard
            name=""
            level={1}
            score={0}
            frameUrl="players/frames/gold.png"
            avatarUrl="players/avatars/player1.png"
            background="players/backgrounds/image-1.png"
          />
        )}

        <div className={styles.playerCoinIndicator}>
          <CoinIcon />
          {coinFormater.format(playerData?.player?.balance || 0)}
        </div>

        <section role="navigation" className={styles.navigation}>
          <div>
            <FrameIcon />
            <p>frame</p>
          </div>
          <div className={styles.active}>
            <BackgraundIcon />
            <p>backgraund</p>
          </div>
          <div>
            <StickerIcon />
            <p>sticker</p>
          </div>
        </section>
      </section>
      <section role="list" className={styles.backgroundsList}>
        {backgroundsData &&
          backgroundsData.backgrounds.map((props) => (
            <div
              key={props.backgroundImageName}
              className={`${styles.backgroundWrap} ${styles.backgroundCard}`}
              onClick={() => {
                if (props.status === BackgroundCardStatus.Owned) {
                  handleChangeBackground(props.id);
                }
              }}
            >
              <img
                src={props.backgroundImageName}
                alt={props.backgroundImageName}
                className={styles.backgroundImage}
              />

              <div className={`${styles.backgroundContent}`}>
                <div className={styles.backgroundCardContent}>
                  <h1>{props.name}</h1>
                  <div className={styles.leftContent}>
                    {props.status === BackgroundCardStatus.Applied && (
                      <div className={styles.applyed}>
                        <ApplyedIcon />
                      </div>
                    )}
                    {props.status === BackgroundCardStatus.Owned && (
                      <p className={styles.owned}>OWNED</p>
                    )}
                    {props.status === BackgroundCardStatus.CanBePurchased && (
                      <div
                        className={styles.purchased}
                        onClick={() =>
                          handleBuyBackground(props.id, props.price || 0)
                        }
                      >
                        <CoinIcon />
                        <p>{coinFormater.format(props.price || 0)}</p>
                      </div>
                    )}
                    {props.status === BackgroundCardStatus.EventOnly && (
                      <div className={styles.eventOnly}>
                        <LockedIcon />
                        <p>Could be obtained from event</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default UserPreferences;

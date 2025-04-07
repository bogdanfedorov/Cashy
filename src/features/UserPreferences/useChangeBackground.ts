import { useMutation } from "@apollo/client";
import { CHANGE_BACKGROUND } from "./queries";
import { Background, BackgroundCardStatus } from "@/types/shared";
import client from "@/lib/apollo-client";

export const useChangeBackground = (playerData: any, backgroundsData: any) => {
  const [changeBackground] = useMutation(CHANGE_BACKGROUND);

  const handleChangeBackground = async (backgroundId: string) => {
    try {
      const { data } = await changeBackground({
        variables: { backgroundId },
      });

      if (playerData) {
        const playerCacheId = client.cache.identify({
          __typename: "Player",
          id: playerData?.player.id,
        });

        client.cache.modify({
          id: playerCacheId,
          fields: {
            background() {
              return data.background;
            },
          },
        });
      }

      if (backgroundsData) {
        backgroundsData.backgrounds.forEach((bg: Background) => {
          if (bg.status === BackgroundCardStatus.Applied) {
            client.cache.modify({
              id: client.cache.identify({
                __typename: "Background",
                id: bg.id,
              }),
              fields: {
                status() {
                  return BackgroundCardStatus.Owned;
                },
              },
            });
          }
          if (bg.id === backgroundId) {
            client.cache.modify({
              id: client.cache.identify({
                __typename: "Background",
                id: bg.id,
              }),
              fields: {
                status() {
                  return BackgroundCardStatus.Applied;
                },
              },
            });
          }
        });
      }

      console.log("Background changed successfully.");
    } catch (error) {
      console.error("Error changing background:", error);
    }
  };

  return handleChangeBackground;
};

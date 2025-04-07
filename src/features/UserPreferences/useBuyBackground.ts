"use client";
import { useMutation } from "@apollo/client";
import { BUY_BACKGROUND, GET_PLAYER } from "./queries";
import client from "@/lib/apollo-client";
import { BackgroundCardStatus, Player } from "@/types/shared";

export const useBuyBackground = () => {
  const [buyBackground] = useMutation(BUY_BACKGROUND);

  const handleBuyBackground = async (backgroundId: string, price: number) => {
    try {
      await buyBackground({
        variables: { backgroundId },
        update: (cache) => {
          const { player } = cache.readQuery<{ player: Player }>({
            query: GET_PLAYER,
          })!;

          cache.writeQuery({
            query: GET_PLAYER,
            data: {
              player: {
                ...player,
                balance: player.balance - price,
              },
            },
          });

          client.cache.modify({
            id: client.cache.identify({
              __typename: "Background",
              id: backgroundId,
            }),
            fields: {
              status() {
                return BackgroundCardStatus.Owned;
              },
            },
          });
        },
      });
    } catch (error) {
      console.error("Purchase failed", error);
    }
  };

  return handleBuyBackground;
};

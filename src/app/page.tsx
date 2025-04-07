"use client";
import Modal from "@/components/Modal/Modal";
import UserPreferences from "@/features/UserPreferences/UserPreferences";
import client from "@/lib/apollo-client";
import { ApolloProvider, gql, useQuery } from "@apollo/client";

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <Modal
        isOpen={true}
        onClose={(): void => {
          throw new Error("Function not implemented.");
        }}
      >
        <UserPreferences />
      </Modal>
    </ApolloProvider>
  );
}

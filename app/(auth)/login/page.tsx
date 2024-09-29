import { LoginPageComponent } from "@/components/login-page";
import { getClient } from "@/lib/apolloClient";
import { AuthPayload } from "@/types/auth";
import gql from "graphql-tag";
import React from "react";

export default function page() {
  const handleLogin = async (
    username: string,
    password: string
  ): Promise<AuthPayload | undefined> => {
    "use server";
    const client = getClient();
    const USER_LOGIN_MUTATION = gql`
      mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
          user {
            _id
            name
            username
            email
            profile_picture
          }
        }
      }
    `;
    const { data } = await client.mutate({
      mutation: USER_LOGIN_MUTATION,
      variables: { username, password },
    });
    if (data && data.login) {
      const { token, user } = data.login;
      return { token, user };
    } else {
      console.error("Login failed");
    }
  };
  return (
    <>
      <LoginPageComponent handleLogin={handleLogin} />
    </>
  );
}

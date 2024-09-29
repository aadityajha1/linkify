// "use client";
import ProfilePageComponent from "@/components/profile-page";
import { getClient } from "@/lib/apolloClient";
import gql from "graphql-tag";
import React from "react";

export default async function Prof() {
  const fetchUserProfile = async (userId: string) => {
    "use server";
    const client = getClient();
    const GET_USER_PROFILE_QUERY = gql`
      query GetUserProfile($userId: ID!) {
        getUser(_id: $userId) {
          _id
          name
          bio
          username
          createdAt
          dob
          profile_picture
        }
      }
    `;
    const { data } = await client.query({
      query: GET_USER_PROFILE_QUERY,
      variables: { userId: userId },
    });

    return data.getUser;
  };
  // (GET_USER_PROFILE_QUERY, {
  //   variables: { userId: "66eeb461f10012d93fac0aa5" },
  // });
  // console.log(data);
  return (
    <>
      <ProfilePageComponent getUser={fetchUserProfile} />
    </>
  );
}

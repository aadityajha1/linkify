"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  MessageCircle,
  ThumbsUp,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInView } from "react-intersection-observer";
import { User } from "@/models/Users";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import moment from "moment";

interface Post {
  id: number;
  content: string;
  likes: number;
  comments: number;
  images: string[];
}

type ProfilePageProps = {
  userDetails: User;
};
const ProfilePageComponent: React.FC<ProfilePageProps> = ({ userDetails }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  console.log(userDetails);
  const fetchPosts = async (pageNum: number) => {
    // Simulating API call
    const newPosts = Array.from({ length: 5 }, (_, i) => ({
      id: posts.length + i + 1,
      content: `Post ${posts.length + i + 1} content. #CodingLife #Innovation`,
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20),
      images: Array.from(
        { length: 4 },
        (_, j) => `/placeholder.svg?height=150&width=150&text=Image${j + 1}`
      ),
    }));
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setPage(pageNum);
  };

  useEffect(() => {
    if (inView) {
      fetchPosts(page + 1);
    }
  }, [inView]);

  const generateAIBio = () => {
    // Simulating AI-generated bio
    const newBio =
      "AI-generated: Innovative software engineer with a passion for cutting-edge technologies. Specializing in AI and machine learning, I strive to create solutions that push the boundaries of what's possible in tech.";
    // In a real implementation, you would update the user's bio in the database
    alert("New AI-generated bio: " + newBio);
  };
  const userLetters = userDetails.name
    .split(" ")
    .map((w) => w.charAt(0))
    .join("");
  return (
    <div className="container sm md:mx-auto py-8 md:w-4/5">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-avatar.jpg" alt="@johndoe" />
                <AvatarFallback>{userLetters} </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-2xl font-bold">{userDetails?.name}</h2>
              <p className="text-muted-foreground">@{userDetails.username}</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>{userDetails.bio}</p>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <LinkIcon className="h-4 w-4" />
                <a href="#" className="hover:underline">
                  johndoe.com
                </a>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Joined{" "}
                  {moment(Number(userDetails?.createdAt)).format("MMMM YYYY")}
                </span>
              </div>
              <Button onClick={generateAIBio} className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate AI Bio
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
              <div>
                <p className="font-bold">1,234</p>
                <p className="text-muted-foreground">Following</p>
              </div>
              <div>
                <p className="font-bold">5,678</p>
                <p className="text-muted-foreground">Followers</p>
              </div>
              <div>
                <p className="font-bold">9,101</p>
                <p className="text-muted-foreground">Posts</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-6 space-y-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder-avatar.jpg"
                        alt="@johndoe"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        John Doe
                      </p>
                      <p className="text-sm text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{post.content}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {post.images.map((image, i) => (
                      <img
                        key={i}
                        src={image}
                        alt={`Post image ${i + 1}`}
                        className="rounded-lg"
                      />
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {post.comments}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
          <div ref={ref} className="h-10" />
        </TabsContent>
        <TabsContent value="media">
          <div className="grid grid-cols-3 gap-4 mt-6">
            {posts
              .flatMap((post) => post.images)
              .map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={image}
                    alt={`Media ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </motion.div>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="likes">
          <p className="text-center text-muted-foreground mt-6">
            Liked posts will appear here.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePageComponent;

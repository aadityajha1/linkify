"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Bell,
  Home,
  Link as LinkIcon,
  MessageCircle,
  Search,
  ThumbsUp,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Post {
  id: number;
  content: string;
  likes: number;
  comments: number;
  images: string[];
  author: {
    name: string;
    username: string;
    avatar: string;
  };
}

interface TrendingTopic {
  id: number;
  name: string;
}

export default function ExplorePage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  useEffect(() => {
    // Simulating API call to fetch trending topics
    const fetchTrendingTopics = () => {
      const topics = [
        { id: 1, name: "TechInnovation" },
        { id: 2, name: "SustainableLiving" },
        { id: 3, name: "DigitalArtRevolution" },
        { id: 4, name: "FutureTech" },
        { id: 5, name: "AIEthics" },
      ];
      setTrendingTopics(topics);
    };

    fetchTrendingTopics();
  }, []);

  const fetchPosts = async (topic: string, pageNum: number) => {
    // Simulating API call to fetch posts for a specific topic
    const newPosts = Array.from({ length: 5 }, (_, i) => ({
      id: posts.length + i + 1,
      content: `Post ${
        posts.length + i + 1
      } about #${topic}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20),
      images: Array.from(
        { length: Math.floor(Math.random() * 4) + 1 },
        (_, j) => `/placeholder.svg?height=200&width=200&text=Image${j + 1}`
      ),
      author: {
        name: `User ${Math.floor(Math.random() * 100)}`,
        username: `user${Math.floor(Math.random() * 100)}`,
        avatar: `/placeholder.svg?height=40&width=40&text=U`,
      },
    }));
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setPage(pageNum);
  };

  useEffect(() => {
    if (inView && selectedTopic) {
      fetchPosts(selectedTopic, page + 1);
    }
  }, [inView, selectedTopic]);

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    setPosts([]);
    setPage(1);
    fetchPosts(topic, 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <LinkIcon className="mr-2 h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Linkify</span>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="w-9 px-0">
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </Button>
              <Button variant="ghost" size="icon" className="w-9 px-0">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon" className="w-9 px-0">
                <MessageCircle className="h-4 w-4" />
                <span className="sr-only">Messages</span>
              </Button>
            </nav>
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full bg-muted pl-8 md:w-[300px]"
                  />
                </div>
              </form>
            </div>
            <Button variant="ghost" size="icon" className="w-9 px-0">
              <User className="h-4 w-4" />
              <span className="sr-only">User menu</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <h1 className="text-3xl font-bold mb-6">Explore Trending Topics</h1>
          <div className="flex flex-wrap gap-2 mb-8">
            {trendingTopics.map((topic) => (
              <Button
                key={topic.id}
                variant={selectedTopic === topic.name ? "default" : "outline"}
                onClick={() => handleTopicClick(topic.name)}
              >
                #{topic.name}
              </Button>
            ))}
          </div>
          {selectedTopic && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">
                Posts for #{selectedTopic}
              </h2>
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
                            src={post.author.avatar}
                            alt={`@${post.author.username}`}
                          />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">
                            {post.author.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            @{post.author.username}
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
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

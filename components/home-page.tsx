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
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  Home,
  Link as LinkIcon,
  MessageCircle,
  Search,
  ThumbsUp,
  User,
  Settings,
  LogOut,
  Sparkles,
  Image as ImageIcon,
  MoreVertical,
  Share,
  Copy,
  Edit,
  BookmarkPlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useInView } from "react-intersection-observer";
import SharePost from "@/components/share-post";
import EditPost from "@/components/edit-post";
import AddToReadingList from "@/components/add-to-reading-list";

interface Post {
  id: number;
  content: string;
  likes: number;
  comments: number;
  images: string[];
}

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [page, setPage] = useState(1);
  const { theme, setTheme } = useTheme();
  const [ref, inView] = useInView();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddToReadingListOpen, setIsAddToReadingListOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const fetchPosts = async (pageNum: number) => {
    // Simulating API call
    const newPosts = Array.from({ length: 5 }, (_, i) => ({
      id: posts.length + i + 1,
      content: `Post ${posts.length + i + 1} content. #Trending #Tech`,
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

  const generateAIContent = async () => {
    // Simulating AI content generation
    const aiContent =
      "AI-generated: The future of technology is evolving rapidly. From quantum computing to neural interfaces, we're on the brink of a new era. What are your thoughts on these advancements? #FutureTech #AI";
    setNewPostContent(aiContent);
  };

  const generateAIImage = async () => {
    // Simulating AI image generation
    alert("AI is generating an image based on your post content...");
    // In a real implementation, you would call an AI image generation API here
  };

  const addPost = () => {
    if (newPostContent.trim()) {
      const newPost: Post = {
        id: Date.now(),
        content: newPostContent,
        likes: 0,
        comments: 0,
        images: Array.from(
          { length: 4 },
          (_, i) =>
            `/placeholder.svg?height=150&width=150&text=NewImage${i + 1}`
        ),
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
    }
  };

  const handleShare = (post: Post) => {
    setSelectedPost(post);
    setIsShareOpen(true);
  };

  const handleCopyLink = (post: Post) => {
    navigator.clipboard.writeText(`https://linkify.com/post/${post.id}`);
    alert("Link copied to clipboard!");
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setIsEditOpen(true);
  };

  const handleAddToReadingList = (post: Post) => {
    setSelectedPost(post);
    setIsAddToReadingListOpen(true);
  };

  return (
    <main className="flex-1 m-5">
      <div className="container grid gap-12 md:grid-cols-[1fr_300px] py-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Textarea
                placeholder="What's on your mind?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
            </CardHeader>
            <CardFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={generateAIContent}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Content
                </Button>
                <Button variant="outline" size="sm" onClick={generateAIImage}>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  AI Image
                </Button>
              </div>
              <Button size="sm" onClick={addPost}>
                Post
              </Button>
            </CardFooter>
          </Card>
          <div className="space-y-4">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
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
                            @johndoe
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleShare(post)}>
                            <Share className="mr-2 h-4 w-4" />
                            <span>Share</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleCopyLink(post)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Copy Link</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(post)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Post</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAddToReadingList(post)}
                          >
                            <BookmarkPlus className="mr-2 h-4 w-4" />
                            <span>Add to Reading List</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
                      <Button variant="ghost" size="icon">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="icon">
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
        </div>
        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Trending Topics</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    #TechInnovation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    #SustainableLiving
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    #DigitalArtRevolution
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Suggested Connections</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder-avatar.jpg"
                      alt="@techguru"
                    />
                    <AvatarFallback>TG</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      Tech Guru
                    </p>
                    <p className="text-sm text-muted-foreground">@techguru</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Connect
                  </Button>
                </li>
                <li className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder-avatar.jpg"
                      alt="@designpro"
                    />
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      Design Pro
                    </p>
                    <p className="text-sm text-muted-foreground">@designpro</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Connect
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
      {selectedPost && (
        <>
          <SharePost
            isOpen={isShareOpen}
            onClose={() => setIsShareOpen(false)}
            post={selectedPost}
          />
          <EditPost
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            post={selectedPost}
            onSave={(updatedPost: any) => {
              setPosts(
                posts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
              );
              setIsEditOpen(false);
            }}
          />
          <AddToReadingList
            isOpen={isAddToReadingListOpen}
            onClose={() => setIsAddToReadingListOpen(false)}
            post={selectedPost}
          />
        </>
      )}
    </main>
  );
}

export default HomePage;

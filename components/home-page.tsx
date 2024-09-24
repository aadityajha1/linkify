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
  Send,
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
  comments: Comment[];
  images: string[];
}
interface Comment {
  id: number;
  content: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  likes: number;
  replies: Comment[];
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
  const [expandedComments, setExpandedComments] = useState<
    Record<number, boolean>
  >({});
  const [newComments, setNewComments] = useState<Record<number, string>>({});
  const [commentPages, setCommentPages] = useState<Record<number, number>>({});
  const [replyPages, setReplyPages] = useState<Record<string, number>>({});
  const [replyingTo, setReplyingTo] = useState<{
    postId: number;
    commentId: number;
  } | null>(null);
  const [newReply, setNewReply] = useState("");
  const fetchPosts = async (pageNum: number) => {
    // Simulating API call
    const newPosts = Array.from({ length: 5 }, (_, i) => ({
      id: posts.length + i + 1,
      content: `Post ${posts.length + i + 1} content. #Trending #Tech`,
      likes: Math.floor(Math.random() * 100),
      comments: Array.from(
        { length: Math.floor(Math.random() * 20) + 1 },
        (_, j) => ({
          id: j + 1,
          content: `Comment ${j + 1} on post ${posts.length + i + 1}`,
          author: {
            name: `User ${Math.floor(Math.random() * 100)}`,
            username: `user${Math.floor(Math.random() * 100)}`,
            avatar: `/placeholder.svg?height=40&width=40&text=U`,
          },
          likes: Math.floor(Math.random() * 20),
          replies: Array.from(
            { length: Math.floor(Math.random() * 10) },
            (_, k) => ({
              id: k + 1,
              content: `Reply ${k + 1} to comment ${j + 1}`,
              author: {
                name: `User ${Math.floor(Math.random() * 100)}`,
                username: `user${Math.floor(Math.random() * 100)}`,
                avatar: `/placeholder.svg?height=40&width=40&text=U`,
              },
              likes: Math.floor(Math.random() * 10),
              replies: [],
            })
          ),
        })
      ),
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
        comments: [],
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

  const toggleComments = (postId: number) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
    if (!commentPages[postId]) {
      setCommentPages((prev) => ({ ...prev, [postId]: 1 }));
    }
  };

  const loadMoreComments = (postId: number) => {
    setCommentPages((prev) => ({ ...prev, [postId]: (prev[postId] || 1) + 1 }));
  };

  const loadMoreReplies = (postId: number, commentId: number) => {
    const key = `${postId}-${commentId}`;
    setReplyPages((prev) => ({ ...prev, [key]: (prev[key] || 1) + 1 }));
  };

  const addComment = (postId: number) => {
    if (newComments[postId]?.trim()) {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [
                {
                  id: post.comments.length + 1,
                  content: newComments[postId],
                  author: {
                    name: "Current User",
                    username: "currentuser",
                    avatar: "/placeholder.svg?height=40&width=40&text=CU",
                  },
                  likes: 0,
                  replies: [],
                },
                ...post.comments,
              ],
            };
          }
          return post;
        })
      );
      setNewComments((prev) => ({ ...prev, [postId]: "" }));
    }
  };

  const addReply = (postId: number, commentId: number) => {
    if (newReply.trim()) {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments.map((comment) => {
                if (comment.id === commentId) {
                  return {
                    ...comment,
                    replies: [
                      {
                        id: comment.replies.length + 1,
                        content: newReply,
                        author: {
                          name: "Current User",
                          username: "currentuser",
                          avatar: "/placeholder.svg?height=40&width=40&text=CU",
                        },
                        likes: 0,
                        replies: [],
                      },
                      ...comment.replies,
                    ],
                  };
                }
                return comment;
              }),
            };
          }
          return post;
        })
      );
      setNewReply("");
      setReplyingTo(null);
    }
  };

  const renderComments = (
    comments: Comment[],
    postId: number,
    isReply = false,
    parentCommentId?: number
  ) => {
    const key = isReply ? `${postId}-${parentCommentId}` : `${postId}`;
    const currentPage = isReply
      ? replyPages[key] || 1
      : commentPages[postId] || 1;
    const itemsPerPage = 5;
    const visibleComments = comments.slice(0, currentPage * itemsPerPage);

    return (
      <div className={`space-y-4 ${isReply ? "ml-8 mt-2" : ""}`}>
        {visibleComments.map((comment) => (
          <div key={comment.id} className="bg-muted p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={comment.author.avatar}
                  alt={`@${comment.author.username}`}
                />
                <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-sm">
                {comment.author.name}
              </span>
              <span className="text-muted-foreground text-xs">
                @{comment.author.username}
              </span>
            </div>
            <p className="text-sm mb-2">{comment.content}</p>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Button variant="ghost" size="sm" className="h-auto p-0">
                <ThumbsUp className="h-3 w-3 mr-1" />
                {comment.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0"
                onClick={() => setReplyingTo({ postId, commentId: comment.id })}
              >
                Reply
              </Button>
            </div>
            {replyingTo?.postId === postId &&
              replyingTo?.commentId === comment.id && (
                <div className="mt-2 flex items-center space-x-2">
                  <Input
                    placeholder="Write a reply..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    className="flex-grow"
                  />
                  <Button
                    size="sm"
                    onClick={() => addReply(postId, comment.id)}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}
            {comment.replies.length > 0 &&
              renderComments(comment.replies, postId, true, comment.id)}
            {comment.replies.length > visibleComments.length * itemsPerPage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => loadMoreReplies(postId, comment.id)}
                className="mt-2"
              >
                Load more replies
              </Button>
            )}
          </div>
        ))}
        {!isReply && comments.length > visibleComments.length && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => loadMoreComments(postId)}
          >
            Load more comments
          </Button>
        )}
      </div>
    );
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
                        {post.comments.length}
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

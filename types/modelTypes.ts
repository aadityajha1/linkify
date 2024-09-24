export type User = {
  _id?: string;
  name: string;
  dob: number;
  profile_picture: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  followers?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type Comment = {
  _id?: string;
  user: User["_id"];
  content: string;
  post: Post["_id"];
  replies: Comment["_id"][];
  createdAt: Date;
  updatedAt: Date;
  likes: User["_id"][];
};

export type Post = {
  _id?: string;
  author: User["_id"];
  title?: string;
  content: string;
  images: string[];
  likes: User["_id"][];
  comments: Comment["_id"][];
};

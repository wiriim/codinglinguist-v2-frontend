export type CardData = {
  title: string;
  number: string;
  subtitle: string;
  image: string;
};

export type FAQData = {
  question: string;
  answer: string;
};

export type CourseData = {
  name: string;
  description: string;
  levels: string;
  difficulty: string;
  image: string;
};

export type NavLink = {
  name: string;
  route: string;
};

// API Related

export type User = {
  id: number;
  username: string;
  email: string;
  point: number;
  status: number;
  role: string;
  forums: Forum[];
  background: string;
  picture: string;
  bio: string;
  badges: Badge[];
};

export type Badge = {
  id: number;
  name: string;
  image: string;
};

export type Category = {
  id: number;
  name: string;
};

export type CategoryType = {
  id: number;
  name: string;
};

export type Reply = {
  id: number;
  userId: number;
  commentId: number;
  content: string;
  createdAt: string;
  _count: { likes: number };
  user: User;
  likes: ReplyLike[];
};

export type ReplyLike = {
  userId: number;
  user: User;
  replyId: number;
  reply: Comment;
};

export type Comment = {
  id?: number;
  forumId: number;
  userId: number;
  content: string;
  createdAt: string;
  _count: { likes: number };
  replies: Reply[];
  user: User;
  likes: CommentLike[];
};

export type CommentLike = {
  userId: number;
  user: User;
  commentId: number;
  comment: Comment;
};

export type Forum = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  userId: number;
  categoryId: number;
  categoryTypeId: number;
  image: string;
  comments: Comment[];
  user: User;
  category: Category;
  categoryType: CategoryType;
  likes: ForumLike[];
  _count: { likes: number; comments: number };
};

export type ForumResp = {
  forums: Forum[];
  totalPages: number;
};

export type ForumLike = {
  forum: Forum;
  forumId: number;
  user: User;
  userId: number;
};

export type Level = {
  id: number;
  number: number;
  title: string;
  content: string;
  input: string;
  answer: string;
  point: number;
  courseId: number;
  questions: Question[];
};

export type Question = {
  id: number;
  content: string;
  answer: string;
  number: string;
  Level: Level;
};

export type Course = {
  id: number;
  name: string;
  levels: Level[];
};

export type Progress = {
  cProgress: UserLevel[];
  javaProgress: UserLevel[];
  pythonProgress: UserLevel[];
};

export type UserLevel = {
  id: number;
  userId: number;
  levelId: number;
  status: number;
};

export type CompilerResp = {
  result: CompilerOutput;
  correct: boolean;
};

export type CompilerOutput = {
  output: string;
  error: string;
  statusCode: number;
  isCompiled: boolean;
};

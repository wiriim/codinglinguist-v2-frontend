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
};

export type Comment = {
  id: number;
  forumId: number;
  userId: number;
  content: string;
  createdAt: string;
  _count: { likes: number };
  replies: Reply[];
};

export type Forum = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  userId: number;
  categoryId: number;
  categoryTypeId: number;
  comments: Comment[];
  user: User;
  category: Category;
  categoryType: CategoryType;
  _count: { likes: number; comments: number };
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
}

export type Course = {
  id: number;
  name: string;
  levels: Level[];
}

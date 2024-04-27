// Define the structure for Author attributes
export interface AuthorAttributes {
  authorId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Define the structure for an Author
export interface Author {
  id: number;
  attributes: AuthorAttributes;
}

// Define the structure for the nested authors within Course attributes
export interface CourseAuthorRelation {
  data: Author[];
}

// Define the structure for Course attributes
export interface CourseAttributes {
  courseId: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  authors: CourseAuthorRelation;
}

// Define the structure for a Course
export interface Course {
  id: number;
  attributes: CourseAttributes;
}

// Define the structure for the meta information regarding pagination
export interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

// Define the top-level structure for the API response
export interface StrapiApiResponse {
  data: Course[];
  meta: Meta;
}

export interface User {
  username: string;
  email: string;
  // other user fields
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

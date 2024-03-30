export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface User {
  id: string
  username: string
  createdAt: string
  bio?: string
  imageUrl?: string
}

export interface Post {
  id: string
  creator: string
  caption: string
  tags: string[]
  location: string
  imageUrl: string
  imageId: string
  createdAt: string

  user: User
}

export interface Database {
  public: {
    Tables: {
      User: {
        Row: User
        Insert: Partial<User>
        Update: Partial<User>
      }
      Post: {
        Row: Post
        Insert: Partial<Post>
        Update: Partial<Post>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

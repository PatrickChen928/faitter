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

export interface Database {
  public: {
    Tables: {
      User: {
        Row: Partial<User>
        Insert: Partial<User>
        Update: Partial<User>
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

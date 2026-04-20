export type UserRole = 'admin' | 'user'

export interface User {
  id: number
  name: string
  email: string
  birthDate: string | null
  role: UserRole
}

export interface CreateUserPayload {
  name: string
  email: string
  password: string
  birthDate: string | null
  role: UserRole
}

export interface UpdateUserPayload {
  name?: string
  email?: string
  password?: string
  birthDate?: string | null
  role?: UserRole
}

export interface UsersPage {
  users: User[]
  total: number
}

export interface UsersParams {
  page?: number
  limit?: number
  name?: string
  email?: string
  role?: UserRole | ''
}

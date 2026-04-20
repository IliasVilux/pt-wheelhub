import type { CreateUserPayload, UpdateUserPayload, User, UsersPage, UsersParams } from '@/types/user'

const BASE = 'http://localhost:3001'

// Helper para eliminar el campo password de los objetos User
function stripPassword<T extends { password?: unknown }>(user: T): Omit<T, 'password'> {
  const { password: _, ...rest } = user
  return rest
}

export async function getUsers(params: UsersParams = {}): Promise<UsersPage> {
  const query = new URLSearchParams()

  if (params.page) query.set('_page', String(params.page))
  if (params.limit) query.set('_limit', String(params.limit))
  if (params.name) query.set('name_like', params.name)
  if (params.email) query.set('email_like', params.email)
  if (params.role) query.set('role', params.role)

  const res = await fetch(`${BASE}/users?${query}`)
  if (!res.ok) throw new Error('Error al cargar usuarios')

  const data = await res.json()
  const totalHeader = res.headers.get('X-Total-Count')
  const total = totalHeader ? Number(totalHeader) : data.length

  return { users: data.map(stripPassword), total }
}

export async function getUserById(id: number): Promise<User> {
  const res = await fetch(`${BASE}/users/${id}`)

  if (!res.ok) throw new Error('Usuario no encontrado')
  return stripPassword(await res.json()) as User
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  const res = await fetch(`${BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (res.status === 409) {
    const err = await res.json()
    throw Object.assign(new Error(err.message), { field: err.field })
  }

  if (!res.ok) throw new Error('Error al crear el usuario')

  return stripPassword(await res.json()) as User
}

export async function updateUser(id: number, payload: UpdateUserPayload): Promise<User> {
  const res = await fetch(`${BASE}/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (res.status === 409) {
    const err = await res.json()
    throw Object.assign(new Error(err.message), { field: err.field })
  }

  if (!res.ok) throw new Error('Error al actualizar el usuario')

  return stripPassword(await res.json()) as User
}

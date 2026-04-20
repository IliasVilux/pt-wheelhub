import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('El email no es válido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/\d/, 'La contraseña debe contener al menos un número'),
  birthDate: z
    .string()
    .refine((val) => !val || !isNaN(Date.parse(val)), 'Fecha no válida')
    .refine((val) => !val || new Date(val) <= new Date(), 'La fecha no puede ser futura')
    .optional(),
  role: z.enum(['admin', 'user'], { message: 'Selecciona un rol' }),
})

export const updateUserSchema = createUserSchema.extend({
  password: z
    .string()
    .refine(
      (val) => !val || (val.length >= 8 && /\d/.test(val)),
      'La contraseña debe tener al menos 8 caracteres y un número',
    )
    .optional(),
})

export type CreateUserFormValues = z.infer<typeof createUserSchema>
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>

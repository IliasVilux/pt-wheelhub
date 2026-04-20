<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createUserSchema, updateUserSchema } from '@/schemas/user'
import type { UpdateUserPayload, User } from '@/types/user'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const props = defineProps<{ user?: User }>()
const emit = defineEmits<{ submit: [values: UpdateUserPayload] }>()

const isEdit = !!props.user

const { handleSubmit, errors, defineField, setFieldError } = useForm({
  validationSchema: toTypedSchema(isEdit ? updateUserSchema : createUserSchema),
  initialValues: {
    name: props.user?.name ?? '',
    email: props.user?.email ?? '',
    password: '',
    birthDate: props.user?.birthDate ?? undefined,
    role: props.user?.role ?? 'user',
  },
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [birthDate, birthDateAttrs] = defineField('birthDate')
const [role, roleAttrs] = defineField('role')

const onSubmit = handleSubmit((values) => {
  const payload: UpdateUserPayload = { ...values }
  if (isEdit && !values.password) delete payload.password
  emit('submit', payload)
})

defineExpose({ setFieldError })
</script>

<template>
  <form class="flex flex-col gap-5" @submit.prevent="onSubmit">
    <div class="flex flex-col gap-1.5">
      <Label for="name">Nombre</Label>
      <Input
        id="name"
        v-model="name"
        v-bind="nameAttrs"
        type="text"
        placeholder="Nombre completo"
        :class="{ 'border-danger': errors.name }"
      />
      <p v-if="errors.name" class="text-xs text-danger">{{ errors.name }}</p>
    </div>

    <div class="flex flex-col gap-1.5">
      <Label for="email">Email</Label>
      <Input
        id="email"
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        placeholder="correo@ejemplo.com"
        :class="{ 'border-danger': errors.email }"
      />
      <p v-if="errors.email" class="text-xs text-danger">{{ errors.email }}</p>
    </div>

    <div class="flex flex-col gap-1.5">
      <Label for="password">
        Contraseña
        <span v-if="isEdit" class="text-muted-foreground font-normal text-xs ml-1"
          >(dejar vacío para no cambiar)</span
        >
      </Label>
      <Input
        id="password"
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        placeholder="Mínimo 8 caracteres y un número"
        :class="{ 'border-danger': errors.password }"
      />
      <p v-if="errors.password" class="text-xs text-danger">{{ errors.password }}</p>
    </div>

    <div class="flex flex-col gap-1.5">
      <Label for="birthDate">
        Fecha de nacimiento
        <span class="text-muted-foreground font-normal text-xs ml-1">(opcional)</span>
      </Label>
      <Input
        id="birthDate"
        v-model="birthDate"
        v-bind="birthDateAttrs"
        type="date"
        :class="{ 'border-danger': errors.birthDate }"
      />
      <p v-if="errors.birthDate" class="text-xs text-danger">{{ errors.birthDate }}</p>
    </div>

    <div class="flex flex-col gap-1.5">
      <Label for="role">Rol</Label>
      <select
        id="role"
        v-model="role"
        v-bind="roleAttrs"
        class="rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-primary/40"
        :class="{ 'border-danger': errors.role }"
      >
        <option value="user">Usuario</option>
        <option value="admin">Admin</option>
      </select>
      <p v-if="errors.role" class="text-xs text-danger">{{ errors.role }}</p>
    </div>

    <div class="flex gap-4">
      <RouterLink
        :to="{ name: 'users-list' }"
        class="self-start bg-neutral-100 px-6 py-3 rounded-2xl text-sm font-medium cursor-pointer"
      >
        Cancelar
      </RouterLink>
      <button
        type="submit"
        class="self-start bg-brand-primary px-6 py-3 rounded-2xl text-sm font-medium cursor-pointer"
      >
        {{ isEdit ? 'Guardar cambios' : 'Crear usuario' }}
      </button>
    </div>
  </form>
</template>

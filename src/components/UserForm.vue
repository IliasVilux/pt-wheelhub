<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createUserSchema, updateUserSchema } from '@/schemas/user'
import type { UpdateUserPayload, User } from '@/types/user'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { AlertCircle, ChevronDown } from 'lucide-vue-next'

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
  <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
    <div class="grid gap-6 sm:grid-cols-2">
      <div class="flex flex-col gap-1.5">
        <Label
          for="name"
          class="text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          Nombre
        </Label>
        <Input
          id="name"
          v-model="name"
          v-bind="nameAttrs"
          type="text"
          placeholder="Nombre completo"
          :class="{
            'border-danger focus-visible:border-danger focus-visible:ring-danger/20': errors.name,
          }"
        />
        <p v-if="errors.name" class="flex items-center gap-1.5 text-xs text-danger">
          <AlertCircle class="size-3.5" />
          {{ errors.name }}
        </p>
      </div>

      <div class="flex flex-col gap-1.5">
        <Label
          for="email"
          class="text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          Email
        </Label>
        <Input
          id="email"
          v-model="email"
          v-bind="emailAttrs"
          type="email"
          placeholder="correo@ejemplo.com"
          :class="{
            'border-danger focus-visible:border-danger focus-visible:ring-danger/20': errors.email,
          }"
        />
        <p v-if="errors.email" class="flex items-center gap-1.5 text-xs text-danger">
          <AlertCircle class="size-3.5" />
          {{ errors.email }}
        </p>
      </div>

      <div class="flex flex-col gap-1.5 sm:col-span-2">
        <Label
          for="password"
          class="text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          Contraseña
          <span
            v-if="isEdit"
            class="ml-1 text-[0.65rem] font-normal normal-case tracking-normal text-muted-foreground/80"
          >
            (dejar vacío para no cambiar)
          </span>
        </Label>
        <Input
          id="password"
          v-model="password"
          v-bind="passwordAttrs"
          type="password"
          placeholder="Mínimo 8 caracteres y un número"
          :class="{
            'border-danger focus-visible:border-danger focus-visible:ring-danger/20':
              errors.password,
          }"
        />
        <p v-if="errors.password" class="flex items-center gap-1.5 text-xs text-danger">
          <AlertCircle class="size-3.5" />
          {{ errors.password }}
        </p>
      </div>

      <div class="flex flex-col gap-1.5">
        <Label
          for="birthDate"
          class="text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          Fecha de nacimiento
          <span
            class="ml-1 text-[0.65rem] font-normal normal-case tracking-normal text-muted-foreground/80"
          >
            (opcional)
          </span>
        </Label>
        <Input
          id="birthDate"
          v-model="birthDate"
          v-bind="birthDateAttrs"
          type="date"
          :class="{
            'border-danger focus-visible:border-danger focus-visible:ring-danger/20':
              errors.birthDate,
          }"
        />
        <p v-if="errors.birthDate" class="flex items-center gap-1.5 text-xs text-danger">
          <AlertCircle class="size-3.5" />
          {{ errors.birthDate }}
        </p>
      </div>

      <div class="flex flex-col gap-1.5">
        <Label
          for="role"
          class="text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          Rol
        </Label>
        <div class="relative">
          <select
            id="role"
            v-model="role"
            v-bind="roleAttrs"
            class="h-11 w-full appearance-none rounded-xl border border-border/70 bg-background pl-4 pr-10 text-sm outline-none transition-[border-color,box-shadow] focus-visible:border-brand-primary/60 focus-visible:ring-[3px] focus-visible:ring-brand-primary/25"
            :class="{
              'border-danger focus-visible:border-danger focus-visible:ring-danger/20': errors.role,
            }"
          >
            <option value="user">Usuario</option>
            <option value="admin">Admin</option>
          </select>
          <ChevronDown
            class="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/70"
          />
        </div>
        <p v-if="errors.role" class="flex items-center gap-1.5 text-xs text-danger">
          <AlertCircle class="size-3.5" />
          {{ errors.role }}
        </p>
      </div>
    </div>

    <div class="mt-2 flex items-center justify-end gap-3 border-t border-border/50 pt-6">
      <RouterLink
        :to="{ name: 'users-list' }"
        class="inline-flex h-11 items-center justify-center rounded-full border border-border/70 bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted/60"
      >
        Cancelar
      </RouterLink>
      <button
        type="submit"
        class="inline-flex h-11 items-center justify-center rounded-full bg-brand-primary px-6 text-sm font-medium text-foreground shadow-[0_1px_0_rgba(0,0,0,0.04),0_10px_24px_-12px_rgba(84,180,30,0.6)] transition-[filter,transform] hover:brightness-[0.97] active:scale-[0.99] cursor-pointer"
      >
        {{ isEdit ? 'Guardar cambios' : 'Crear usuario' }}
      </button>
    </div>
  </form>
</template>

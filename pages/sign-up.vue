<template>
  <div
    class="custom-bg-img relative grid h-full place-content-center bg-contain bg-fixed bg-center px-2 py-12 xs:h-svh xs:py-0 sm:px-0"
  >
    <div class="absolute inset-0 w-full bg-custom-bg/85"></div>
    <AppLogo class="z-10 mx-auto mb-5" />
    <Card class="z-10 mx-auto max-w-sm bg-custom-foreground">
      <CardHeader>
        <CardTitle class="text-xl text-custom-bg"> Sign Up </CardTitle>
        <CardDescription class="text-custom-bg">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="createUser">
          <Transition name="fade" mode="out-in">
            <Alert v-if="errorMessage" variant="destructive" class="mb-4 border-0 bg-red-50">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {{ errorMessage }}
              </AlertDescription>
            </Alert>
          </Transition>
          <div class="grid gap-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="grid gap-2">
                <Label for="first-name" class="text-custom-bg">First name</Label>
                <Input
                  id="first-name"
                  v-model.trim="models.firstName"
                  placeholder="John"
                  class="text-custom-bg"
                  required
                />
              </div>
              <div class="grid gap-2">
                <Label for="last-name" class="text-custom-bg">Last name</Label>
                <Input
                  id="last-name"
                  v-model.trim="models.lastName"
                  placeholder="Doe"
                  class="text-custom-bg"
                  required
                />
              </div>
            </div>
            <div class="grid gap-2">
              <Label for="email" class="text-custom-bg">Email</Label>
              <Input
                id="email"
                v-model.trim="models.email"
                type="email"
                placeholder="m@example.com"
                class="text-custom-bg"
                required
              />
            </div>
            <div class="grid gap-2">
              <Label for="password" class="text-custom-bg" required>Password</Label>
              <div class="relative w-full">
                <Input
                  id="password"
                  v-model="models.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="pr-10 text-custom-bg"
                  required
                />
                <span
                  role="button"
                  class="absolute inset-y-0 end-0 flex items-center justify-center px-3"
                  @click="showPassword = !showPassword"
                >
                  <IconEyeOff v-if="!showPassword" class="size-4 text-muted-foreground" />
                  <IconEye v-else class="size-4 text-muted-foreground" />
                </span>
              </div>
            </div>
            <div class="grid gap-2">
              <Label for="confirm-password" class="text-custom-bg" required>Confirm Password</Label>
              <div class="relative w-full">
                <Input
                  id="confirm-password"
                  v-model="models.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="pr-10 text-custom-bg"
                  required
                />
                <span
                  role="button"
                  class="absolute inset-y-0 end-0 flex items-center justify-center px-3"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <IconEyeOff v-if="!showConfirmPassword" class="size-4 text-muted-foreground" />
                  <IconEye v-else class="size-4 text-muted-foreground" />
                </span>
              </div>
            </div>
            <Button
              type="submit"
              class="w-full bg-custom-primary text-custom-foreground hover:bg-custom-primary/80"
              :disabled="isLoading"
            >
              <IconLoaderCircle v-if="isLoading" class="mr-1.5 animate-spin" :size="18" />
              {{ isLoading ? 'Creating...' : 'Create account' }}
            </Button>
          </div>
        </form>
        <div class="mt-4 text-center text-sm text-custom-bg">
          Already have an account?
          <NuxtLink to="/login" class="underline"> Sign in </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword, updateProfile, type Auth } from 'firebase/auth'

definePageMeta({
  layout: false
})

const auth = useFirebaseAuth() as Auth
const router = useRouter()
const models = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const showPassword = ref<boolean>(false)
const showConfirmPassword = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const errorMessage = ref<string | null>(null)
let timeout: ReturnType<typeof setTimeout>

async function createUser() {
  isLoading.value = true
  try {
    clearTimeout(timeout)
    errorMessage.value = null

    if (models.password !== models.confirmPassword) {
      throw new Error('Password does not match.')
    }

    const userCredential = await createUserWithEmailAndPassword(auth, models.email, models.password)
    const user = userCredential.user
    updateProfile(user, {
      displayName: `${models.firstName} ${models.lastName}`
    })
    router.go(0)
  } catch (error) {
    isLoading.value = false
    errorMessage.value = 'An unknown error occurred.'

    if (error instanceof FirebaseError) {
      if (error.code === 'auth/email-already-in-use') {
        errorMessage.value = 'Email already exists.'
      } else if (error.code === 'auth/weak-password') {
        errorMessage.value = 'Password should be at least 6 characters.'
      } else {
        errorMessage.value = error.message
      }
    } else if (error instanceof Error) {
      errorMessage.value = error.message
    }

    clearErrorMessage()
  }
}

function clearErrorMessage() {
  timeout = setTimeout(() => {
    errorMessage.value = null
  }, 3000)
}
</script>

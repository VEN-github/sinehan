<template>
  <div class="grid h-screen place-content-center px-2 sm:px-0">
    <AppLogo class="mx-auto mb-5" />
    <Card class="mx-auto max-w-sm bg-custom-foreground">
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
              <Input
                id="password"
                v-model="models.password"
                type="password"
                class="text-custom-bg"
                required
              />
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

const auth = useFirebaseAuth() as Auth
const router = useRouter()
const models = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})
const isLoading = ref<boolean>(false)
const errorMessage = ref<string | null>(null)
let timeout: ReturnType<typeof setTimeout>

async function createUser() {
  try {
    isLoading.value = true
    clearTimeout(timeout)
    errorMessage.value = null
    const userCredential = await createUserWithEmailAndPassword(auth, models.email, models.password)
    const user = userCredential.user
    updateProfile(user, {
      displayName: `${models.firstName} ${models.lastName}`
    })
    router.go(0)
  } catch (error) {
    isLoading.value = false
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/email-already-in-use') {
        errorMessage.value = 'Email already exists.'
      } else if (error.code === 'auth/weak-password') {
        errorMessage.value = 'Password should be at least 6 characters.'
      } else {
        errorMessage.value = error.message
      }

      timeout = setTimeout(() => {
        errorMessage.value = null
      }, 3000)
    }
  }
}
</script>

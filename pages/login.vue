<template>
  <div class="grid h-screen place-content-center px-2 sm:px-0">
    <AppLogo class="mx-auto mb-5" />
    <Card class="mx-auto max-w-sm bg-custom-foreground">
      <CardHeader>
        <CardTitle class="text-2xl text-custom-bg"> Login </CardTitle>
        <CardDescription class="text-custom-bg">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="login">
          <Transition name="fade" mode="out-in">
            <Alert v-if="errorMessage" variant="destructive" class="mb-4 border-0 bg-red-50">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {{ errorMessage }}
              </AlertDescription>
            </Alert>
          </Transition>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email" class="text-custom-bg">Email</Label>
              <Input
                id="email"
                v-model="models.email"
                type="email"
                placeholder="m@example.com"
                class="text-custom-bg"
                required
              />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password" class="text-custom-bg">Password</Label>
                <a href="#" class="ml-auto inline-block text-sm text-custom-bg underline">
                  Forgot your password?
                </a>
              </div>
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
            >
              Login
            </Button>
          </div>
        </form>
        <div class="mt-4 text-center text-sm text-custom-bg">
          Don't have an account?
          <NuxtLink to="/sign-up" class="underline"> Sign up </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { signInWithEmailAndPassword, type Auth } from 'firebase/auth'

const auth = useFirebaseAuth() as Auth
const models = reactive({
  email: '',
  password: ''
})
const errorMessage = ref<string | null>(null)
let timeout: ReturnType<typeof setTimeout>

async function login() {
  clearTimeout(timeout)
  errorMessage.value = null
  signInWithEmailAndPassword(auth, models.email, models.password)
    .then((userCredential) => {
      const user = userCredential.user
      console.log(user)
    })
    .catch((error) => {
      if (error.code === 'auth/invalid-credential') {
        errorMessage.value = 'Email or password is incorrect.'
      } else if (error.code === 'auth/user-not-found') {
        errorMessage.value = 'User not found.'
      } else {
        errorMessage.value = error.message
      }
    })
}
</script>

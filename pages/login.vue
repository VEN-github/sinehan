<template>
  <div class="grid h-screen place-items-center">
    <Card class="bg-custom-foreground mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-custom-bg text-2xl">
          Login
        </CardTitle>
        <CardDescription class="text-custom-bg">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label
              for="email"
              class="text-custom-bg"
            >Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              class="text-custom-bg"
              required
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label
                for="password"
                class="text-custom-bg"
              >Password</Label>
              <a
                href="#"
                class="text-custom-bg ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              class="text-custom-bg"
              required
            />
          </div>
          <Button
            type="submit"
            class="bg-custom-primary text-custom-foreground hover:bg-custom-primary/80 w-full"
          >
            Login
          </Button>
        </div>
        <div class="text-custom-bg mt-4 text-center text-sm">
          Don't have an account?
          <NuxtLink
            to="/sign-up"
            class="underline"
          >
            Sign up
          </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

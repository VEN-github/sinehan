<template>
  <div class="grid h-screen place-content-center px-2 sm:px-0">
    <AppLogo class="mx-auto mb-5" />
    <Card class="mx-auto max-w-sm bg-custom-foreground">
      <CardHeader>
        <CardTitle class="text-xl text-custom-bg">
          Sign Up
        </CardTitle>
        <CardDescription class="text-custom-bg">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <Label
                for="first-name"
                class="text-custom-bg"
              >First name</Label>
              <Input
                id="first-name"
                placeholder="Max"
                class="text-custom-bg"
                required
              />
            </div>
            <div class="grid gap-2">
              <Label
                for="last-name"
                class="text-custom-bg"
              >Last name</Label>
              <Input
                id="last-name"
                placeholder="Robinson"
                class="text-custom-bg"
                required
              />
            </div>
          </div>
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
            <Label
              for="password"
              class="text-custom-bg"
              required
            >Password</Label>
            <Input
              id="password"
              type="password"
              class="text-custom-bg"
            />
          </div>
          <Button
            type="submit"
            class="w-full bg-custom-primary text-custom-foreground hover:bg-custom-primary/80"
          >
            Create an account
          </Button>
        </div>
        <div class="mt-4 text-center text-sm text-custom-bg">
          Already have an account?
          <NuxtLink
            to="/login"
            class="underline"
          >
            Sign in
          </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

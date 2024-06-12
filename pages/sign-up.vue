<template>
  <div class="grid h-screen place-items-center">
    <Card class="bg-custom-foreground mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-custom-bg text-xl">
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
            class="bg-custom-primary text-custom-foreground hover:bg-custom-primary/80 w-full"
          >
            Create an account
          </Button>
        </div>
        <div class="text-custom-bg mt-4 text-center text-sm">
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

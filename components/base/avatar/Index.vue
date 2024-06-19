<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <div class="flex items-center gap-2">
        {{ user?.displayName }}<IconChevronDown class="size-5" />
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="cursor-pointer" @click="logout">Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { FirebaseError } from 'firebase/app'
import { signOut, type Auth } from 'firebase/auth'
import { useToast } from '@/components/ui/toast/use-toast'

const auth = useFirebaseAuth() as Auth
const user = useCurrentUser()
const router = useRouter()
const { toast } = useToast()

async function logout() {
  try {
    await signOut(auth)
    router.go(0)
  } catch (error) {
    let errorMessage = 'An unknown error occurred.'

    if (error instanceof FirebaseError) {
      errorMessage = error.message
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    toast({ title: 'Error', description: errorMessage, variant: 'destructive' })
  }
}
</script>

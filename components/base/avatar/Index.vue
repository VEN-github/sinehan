<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <div v-if="displayName" class="flex items-center gap-2">
        {{ displayName }}<IconChevronDown class="size-5" />
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
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
const displayName = ref<string | null>(null)

onMounted(() => {
  displayName.value = user.value?.displayName || null
})

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

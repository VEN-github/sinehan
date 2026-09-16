// export default defineNuxtRouteMiddleware(async (to) => {
//   const user = await getCurrentUser()

//   if (user && (to.path === '/login' || to.path === '/sign-up')) {
//     return navigateTo('/')
//   } else if (!user && to.path !== '/login' && to.path !== '/sign-up') {
//     return navigateTo({ path: '/login' })
//   }
// })

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/login') {
    return navigateTo('/')
  }
})

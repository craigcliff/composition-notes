<template>
    <nav
      class="navbar is-dark"
      aria-label="main navigation"
      role="navigation"
    >
    <div class="container is-max-desktop px-2">     
        <div class="navbar-brand">
          <div
            class="navbar-item is-size-4 is-family-monospace"
          >
              Notes App
          </div>
      
          <a
            @click.prevent="showMobileNav = !showMobileNav"
            class="navbar-burger"
            :class="{ 'is-active ' : showMobileNav }"
            aria-expanded="false"
            aria-label="menu"
            data-target="navbarBasicExample"
            role="button"
            ref="navBarBurgerRef"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      
        <div
          id="navbarBasicExample"
          class="navbar-menu"
          :class="{ 'is-active ' : showMobileNav }"
          ref="navBarMenuRef"
        >
        <div class="navbar-start">
         <button
            v-if="storeAuth.user.id"
            @click="logout"
            class="button is-small mt-3 ml-3"
          >
            Log out {{ storeAuth.user.email }}
          </button>
        </div>
          <div class="navbar-end">
            <RouterLink
              v-if="storeAuth.user.id"
               @click="showMobileNav = false"
               class="navbar-item"
               active-class="is-active"
               to="/"
             >
              Notes
            </RouterLink>
            <RouterLink
               v-if="storeAuth.user.id"
               @click="showMobileNav = false"
               class="navbar-item"
               active-class="is-active"
               to="/stats"
             >
              Stats
            </RouterLink>
          </div>
        </div>
    </div>
</nav>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStoreAuth } from '@/stores/storeAuth'

const storeAuth = useStoreAuth()

const showMobileNav = ref(false)

const navBarMenuRef = ref(null)
const navBarBurgerRef = ref(null)

onClickOutside(navBarMenuRef, () => {
  showMobileNav.value = false
}, {
  ignore: [navBarBurgerRef]
})

const logout = () => {
  showMobileNav.value = false
  storeAuth.logoutUser()
}

</script>


<style scoped>
@media (max-width: 1023px) {
    .navbar-menu {
        position: absolute;
        left: 0;
        width: 100%
    }
}
</style>

<template>
  <NavBar />

<div class="container is-max-desktop px-2 py-4">
    <RouterView />
</div>

</template>

<script setup>

import NavBar from '@/components/Layout/NavBar.vue'
import { onMounted } from 'vue'
import { useStoreAuth } from '@/stores/storeAuth'


const storeAuth = useStoreAuth()

onMounted(() => {
  storeAuth.init()
})

</script>


<style>
@import 'bulma/css/bulma.min.css';
</style>


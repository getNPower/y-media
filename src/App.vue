<template>
  <v-app>
    <v-main>
      <Dialog />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Dialog from '@/components/Dialog'

export default {
  name: 'App',
  components: {
    Dialog,
  },

  data: () => ({
    //
  }),
};
</script>

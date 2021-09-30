<template>
  <div>
    <movie-grid />
  </div>

</template>

<script>
  import { mapState } from 'vuex';
  import MovieGrid from '@/components/MovieGrid'


  export default {
    name: 'Home',
    components: {
      MovieGrid,
    },

    created() {
      this.$store.dispatch('getMovies');
    },
  }
</script>

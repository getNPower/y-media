<template>
  <div>
    <h1>All movies</h1>
    <v-simple-table class="table">
    <template>
      <thead>
      <tr>
        <th class="text-left">
          Image
        </th>
        <th class="text-left">
          name
        </th>
        <th class="text-left">
          name
        </th>
        <th class="text-left">
          genre
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in movies"
          :key="item.id"
          @click="openDetails(item.id)"
          class="table__row"
      >
        <td>
          <v-img
              max-height="250"
              max-width="250"
              :src="item.image"
          ></v-img>
        </td>
        <td><h2>{{ item.name }}</h2></td>
        <td><div v-html="item.description"></div></td>
        <td><p>{{ item.genre }}</p></td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
  </div>

</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MovieGrid',
  computed: {
    ...mapState({
      movies: (state) => state.movies,
    }),
  },

  created() {

  },

  methods: {
    openDetails(id) {
      // this.$store.commit('SET_DIALOG', {error_code: 'test', error_message: id});
      this.$router.push(`/movie/${id}`);
    },
  },
}
</script>

<style lang="scss" scoped>

  ::v-deep .table{
    & .table__row{
      cursor: pointer;
      & td:first-child{
        width: 20%;
      }
      & td:nth-child(2){
        width: 20%;
        text-align: center;
      }
      & td:nth-child(3){
        width: 55%;
      }
      & td:last-child{
        width: 5%;
        text-align: center;
      }
    }
  }

</style>

<template>
  <div v-if="currentMovie">
    <v-card
        class="mx-auto my-12"
        max-width="80%"
    >

      <v-img
          height="250"
          :src="currentMovie.image"
      ></v-img>

      <v-card-title>{{ currentMovie.name }}</v-card-title>

      <v-card-text>
        <v-row
            align="center"
            class="mx-0"
        >
          <v-rating
              :value="currentMovie.genre"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
          ></v-rating>

          <div class="grey--text ms-4">
            {{currentMovie.genre}}
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1" v-html="currentMovie.description">
        </div>

        <div v-html="currentMovie.additional"></div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <div v-for="(item, index) in sessions[$route.params.id]" :key="index">
        <v-card-title>{{ item.showdate }}</v-card-title>

        <v-card-text>
          <v-chip-group
              active-class="deep-purple accent-4 white--text"
              column
          >

            <v-chip v-for="(date, index2) in parseTime(item.daytime)" :key="index2" @click="checkFree(item.showdate, date)">{{ date }}</v-chip>
          </v-chip-group>
        </v-card-text>

      </div>
    </v-card>
    <plase-dialog
        :places="places"
        :isOpen="isOpen"
        @closeModal="closeModal"
        @bookPlace="bookPlace"
    />
  </div>

</template>

<script>
import {mapState} from "vuex";
import PlaseDialog from "@/components/PlaseDialog"

export default {
  name: "Movie",
  components: {PlaseDialog},
  data() {
    return {
      selection: null,
      places: [],
      isOpen: false,
      date: null,
      time: null,
    }
  },
  computed: {
    ...mapState({
      movies: (state) => state.movies,
      sessions: (state) => state.sessions,
    }),
    currentMovie() {
      let i;
      this.movies.forEach(e => {
        if (e.id === parseInt(this.$route.params.id, 10)){
          return i = e;
        } else { i === null}
      });
      return i;
    }
  },
  watch: {
  },
  created() {
    this.$store.dispatch('getMovieSessions', this.$route.params.id);
  },
  methods: {
    parseTime(str) {
      return str.split(';');
    },
    reserve() {

    },
    checkFree(date, time) {
      console.log(date, time);
      this.date = date;
      this.time = time;
      this.$store.dispatch('checkFreePlaces', {
        id: this.$route.params.id,
        daytime: time,
        showdate: date,
        cb: (data) => {
          this.places = data;
          this.isOpen = true;
        },
      });
    },
    closeModal() {
      this.isOpen = false;
    },
    bookPlace(arg) {
      this.$store.dispatch('bookingPlaces', {
        id: this.$route.params.id,
        row: arg.row,
        seat: arg.seat,
        showdate: this.date,
        daytime: this.time,
        cb: (data) => {
          this.$store.commit('SET_DIALOG', {
            error_code: 'Success',
            error_message: `${data}`,
          });
          this.closeModal();
        }
      });
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <v-row justify="center">
    <v-dialog
        v-model="isOpen"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
            dark
            color="primary"
        >
          <v-btn
              icon
              dark
              @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Place status</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <table>
          <tr v-for="(item, index) in places" :key="index">
            <th>Row {{item[0].row }}</th>
            <th
                v-for="(place, number) in item[1]"
                :key="number"><v-chip
                :disabled="!place.is_free"
                :color="'#690'"
                @click="choosePlase(item[0].row, place.seat)"
                :class="{ disabled: !place.is_free }"
            >
              {{place.seat}}
            </v-chip></th>
          </tr>
        </table>

      </v-card>
    </v-dialog>
  </v-row>
    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          max-width="350"
      >
        <v-card>
          <v-card-title class="text-h5">
            Confirm booking Place
          </v-card-title>

          <v-card-text>
            <p>Row is {{row}}</p>
            <p>Seat is {{seat}}</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                color="green darken-1"
                text
                @click="cancel"
            >
              Disagree
            </v-btn>

            <v-btn
                color="green darken-1"
                text
                @click="booking"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PlaseDialog",
  props: {
    places:{
      type: Array,
      default: () => [],
    },
    isOpen: {
      type: Boolean,
      default: () => false,
    }
  },
  data() {
    return {
      dialog: false,
      seat: null,
      row: null,
    }
  },

  methods: {
    close() {
      this.$emit('closeModal');
    },
    booking() {
      this.$emit('bookPlace', {row: this.row, seat: this.seat});
      this.dialog = false;
    },
    cancel() {
      this.seat = null;
      this.row = null;
      this.dialog = false;
    },
    choosePlase(row, seat) {
      this.seat = seat;
      this.row = row;
      this.dialog = true;
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-chip {
  padding: 0 6px;

  & .v-chip__content{

  }

}
.disabled{
 &::v-deep .v-chip {
   background: #e0e0e0;
 & .v-chip__content{
   font-weight: 300;
 }

}
}

</style>

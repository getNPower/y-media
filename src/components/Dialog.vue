<template>
  <div class="text-center">
    <v-dialog
        v-model="dialog"
        width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2" v-html="code">

        </v-card-title>

        <v-card-text v-html="message">

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="closeDialog"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "Dialog",
  computed: {
    ...mapState({
      dialog: (state) => state.dialog.state,
      message: (state) => state.dialog.message,
      code: (state) => state.dialog.code,
    }),
  },
  methods: {
    closeDialog() {
      this.$store.commit('CLOSE_DIALOG');
    }
  },
}
</script>

<style scoped>

</style>

<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import { mapMutations } from "vuex";
import { FBAuthUI } from "@/auth";
import firebase from "firebase/app";

export default {
  mounted() {
    FBAuthUI.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          this.setUser(authResult.user);
          return false;
        },
      },
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    });
  },
  destroyed() {
    FBAuthUI.reset();
  },
  methods: {
    ...mapMutations(["setUser"]),
  },
};
</script>

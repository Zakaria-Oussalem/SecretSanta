<template>
      <header className="App-header">
        <div className="title-box">
          <h1>SECRET SANTA</h1>
        </div>
        <div className="button-container">
          <button className="button" @click="navigateToCreateSession">
            Create a session
          </button>
          <button className="button" @click="navigateToJoinSession">
            Join a session
          </button>
        </div>
      </header>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

function navigateToCreateSession() {
    router.push("/create");
}

function navigateToJoinSession() {
    router.push("/join");
}

</script>

<style scoped>

</style>


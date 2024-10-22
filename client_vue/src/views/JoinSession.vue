<template>
      <header className="App-header">
        <div className="title-box">
          <h1>SECRET SANTA</h1>
        </div>
        <div className="small-box">
          <h3>Submit your name and the session ID</h3>
        </div>
        <form @submit.prevent="handleSubmit" className="submitForm">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            v-model="username"
          />
          <label htmlFor="sessionid">Session ID</label>
          <input
            type="text"
            name="session_id"
            id="session_id"
            v-model="session_id"
          />
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </header>
</template>

<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";
import { joinSession } from "../services/SessionService.js";

const router = useRouter();
const username = ref("");
const session_id = ref("");
const isLoading = ref(false);
async function handleSubmit () {
  isLoading.value = true;
  try {
    console.log(username.value);
    const { user_id } = await joinSession(session_id.value,username.value);
    router.push(`/session/${session_id.value}/${user_id}`);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.button:disabled {
  background-color: #b7b7b7;
  cursor: not-allowed;
}
</style>
<template>
      <header className="App-header">
        <div className="title-box">
          <h1>SECRET SANTA</h1>
        </div>
        <div className="small-box">
          <p>Choose your username. Others need to be able to identify you</p>
        </div>
        <form @submit.prevent="handleSubmit" className="submitForm">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            v-model="username"
          />
          <button type="submit" className="button" :disabled="isLoading">
            Submit
          </button>
        </form>
      </header>
</template>

<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";
import { createSession } from "../services/SessionService.js";

const router = useRouter();
const username = ref("");
const isLoading = ref(false);
async function handleSubmit () {
  isLoading.value = true;
  try {
    console.log(username.value);
    const { session_id, user_id } = await createSession(username.value,"admin");
    router.push(`/session/${session_id}/${user_id}`);
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
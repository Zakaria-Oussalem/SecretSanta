<template>
        <header v-if="isLoading" className="App-header">
            <div className="title-box">
            <h1>Loading ...</h1>
            </div>
        </header>

        <header v-else-if="players.length === 0" className="App-header">
            <div className="title-box">
            <h1>No players in the session</h1>
            </div>
        </header>

        <header v-else-if="currentPlayer===null" className="App-header">
            <div className="title-box">
                <h1>Invalid player</h1>
            </div>
        </header>

      <header v-else className="App-header">
        <div className="title-box">
          <h1>SECRET SANTA</h1>
        </div>
        <h2>Welcome, {{ currentPlayer.username }}</h2>
        <p className="invite-message">
          Invite your friends to join by sending them the session ID and website
          link.
        </p>
        <div className="info-box">
          <p>
            <strong>Session ID:</strong> {{ session_id }}
          </p>
          <p>
            <strong>Number of players:</strong> {{ players.length }}
          </p>
          <div className="players-list">
            <h3>Players:</h3>
            <ul>
                <li v-for="(player, i) in players" :key="i">
                    {{ player.username }}
                    <span class="player-role">({{ player.role }})</span>
                </li>
            </ul>
          </div>
        </div>
          <div v-if="currentPlayer.role==='admin' "className="button-container">
            <button
              type="submit"
              className="button"
              @click="handleSubmit"
              :disabled="isSubmitting"
            >
              Start Attribution
            </button>
          </div>
          <div className="spinner-container">
            <div className="spinner"></div>
            <h3>Waiting for all players to join</h3>
          </div>
      </header>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const session_id = route.params.session_id;
const user_id = route.params.user_id;

const players = ref([]);
const isLoading = ref(true);
const isSubmitting = ref(false);
const currentPlayer = ref(null);
let fetchInterval = null; // Variable to hold the interval ID

async function handleSubmit() {
  isSubmitting.value = true;
  // launch attribution in backend side
  const response = await fetch(`http://127.0.0.1:8000/launch`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session: parseInt(session_id),
    }),
  })
  // Redirect to attribution page
  if (! response.ok) {
    console.error("Error launching attribution:", response.statusText);    
  } else {
    router.push(`/attribution/${session_id}/${user_id}`);
  }
};

async function fetchPlayers() {
  console.log("Fetching players...", session_id);
  try {
    const response = await fetch(`http://127.0.0.1:8000/session/${session_id}`);
    players.value = await response.json();

    // Find the current player
    currentPlayer.value = players.value.find(
      (player) => player.id == user_id
    )
    isLoading.value = false;
    if (currentPlayer.value.role !== "admin" && currentPlayer.value.attributed !== null) {
      router.push(`/attribution/${session_id}/${user_id}`);
    }
  } catch (error) {
    console.error("Error fetching players:", error);
    isLoading.value = false;
  }
}

// Set up interval to fetch players every second after component is mounted

fetchPlayers(); // Fetch players immediately on mount
fetchInterval = setInterval(fetchPlayers, 1000); // Fetch every second


// Clear the interval when the component is unmounted
onBeforeUnmount(() => {
  clearInterval(fetchInterval);
});
</script>
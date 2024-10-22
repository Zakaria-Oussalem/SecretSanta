<template>
    <header v-if="isLoading" className="App-header">
        <div className="title-box">
            <h1>Loading ...</h1>
        </div>
    </header>
    <header v-else className="App-header">
    <div className="title-box">
        <h1>SECRET SANTA</h1>
    </div>
    <h2> <span class="user">{{ username }}</span>, your attributed player is:</h2>
    <div className="attributed-box">
        <h3 class="attributed">{{ attributed }}</h3>
    </div>
    <div className="session-info">
        <h3>Session ID: {{ session_id }}</h3>
        <h3>Thank You For Playing!</h3>
    </div>
    </header>
    <button className="button home-button" @click="handleHomeClick">
        Home
    </button>
</template>

<script setup>

import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const route = useRoute();
const user_id = route.params.user_id;
const session_id = route.params.session_id;

const attributed = ref('');
const username = ref('');
const isLoading = ref(true);

async function fetchAttribution () {
    try {
        const response = await fetch(`http://127.0.0.1:8000/users/${user_id}`);
        const data = await response.json();
        attributed.value = data.attributed;
        username.value = data.username;
        isLoading.value = false;
    } catch (error) {
        console.error('Error fetching attribution:', error);
    }
};

fetchAttribution();
const handleHomeClick = () => {
    router.push('/');
};
</script>

<style scoped>
h2 {
    font-size: 30px;
    margin-bottom: 20px;
    text-align: center;
}
.user {
    font-size: 35px;
    color: rgb(231, 224, 189);
    font-weight: bold;
    /* italic */
    font-style: italic;
}
.attributed {
    font-size: 35px;
    color: rgb(13, 12, 112);
    font-weight: bold;
    /* italic */
    font-style: italic;
}
.attributed-box {
background: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
padding: 15px;
margin: 15px;
border-radius: 10px;
width: 80%;
max-width: 600px;
text-align: center;
font-size: 24px;
}

/* Session Info Styles */
.session-info {
margin: 20px;
font-size: 20px;
}
</style>
<template>
    <div class="container mt-5">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            required
            />
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            required
            />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";

const email = ref("");
const password = ref("");
const router = useRouter();
const userStore = useUserStore();

const handleLogin = async () => {
    try {
        await userStore.login(email.value, password.value);
        router.push("/");
    } catch (error) {
        console.error("Login error:", error);
    }
};
</script>

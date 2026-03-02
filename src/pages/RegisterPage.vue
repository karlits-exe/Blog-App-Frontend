<template>
  <div class="register-page container mt-5">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
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
            <label for="username" class="form-label">Username</label>
            <input
            type="text"
            class="form-control"
            id="username"
            v-model="username"
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
        <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";

const router = useRouter();
const email = ref("");
const password = ref("");
const username = ref("");

const handleRegister = async () => {
  const userStore = useUserStore();

  try {
    await userStore.register({
      email: email.value,
      username: username.value,
      password: password.value,
    });
    router.push("/login");
  } catch (error) {
    console.error("Registration failed:", error);
  }
};
</script>

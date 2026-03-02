<template>
  <div class="navbar navbar-expand-lg navbar-light bg-light">
    <RouterLink class="navbar-brand" to="/">Blog App</RouterLink>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- For Authenticated Users -->
    <div v-if="userStore.isAuthenticated && !userStore.isAdmin">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item active">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/blogs">Blogs</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/post-blog">Post Blog</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/edit-blog">Edit / Delete Blogs</RouterLink>
          </li>
          <li class="nav-item">
            <a class="nav-link" role="button" @click.prevent="handleLogout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- For Admins -->
    <div v-if="userStore.isAdmin">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item active">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/blogs">Blogs</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/post-blog">Post Blog</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/edit-blog-admin">Edit / Delete Blogs</RouterLink>
          </li>
          <li class="nav-item">
            <a class="nav-link" role="button" @click.prevent="handleLogout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- For Non-Admin Users / Non Authenticated Users -->
    <div v-if="!userStore.isAuthenticated">
      <div class="collapse navbar-collapse ms-auto" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item active">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/login">Login</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/register">Register</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();
const router = useRouter();

const handleLogout = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<template>
  <div>
    <div
      class="card"
      v-for="blog in blogs"
      :key="blog.id"
      style="margin-bottom: 1rem"
    >
      <h5 class="card-header">{{ blog.author.username }}</h5>
      <div class="card-body">
        <h5 class="card-title">{{ blog.title }}</h5>
        <p class="card-text">
          {{ blog.content }}
        </p>
        <RouterLink :to="`/blogs/${blog._id}`" class="btn btn-primary">Read more</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import api from "../services/api";

const blogs = ref([]);

onMounted(() => {
  const fetchBlogs = async () => {
    try {
      const response = await api.get("/blogs/");
      blogs.value = response.data;
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  fetchBlogs();
});
</script>

<style scoped>
.card {
  width: 50%;
  margin: 0 auto;
}
</style>

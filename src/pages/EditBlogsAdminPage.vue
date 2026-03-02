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
        <button
                class="btn btn-primary me-2"
                @click="openModal(blog)"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
              >
                Edit
              </button>
              <button
                class="btn btn-danger"
                @click="deleteBlog(blog._id)"
              >
                Delete
              </button>
      </div>
    </div>

    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Blog</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <form @submit.prevent="updateBlog">
              <div class="mb-3">
                <label class="form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="selectedBlog.title"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Content</label>
                <textarea
                  class="form-control"
                  rows="5"
                  v-model="selectedBlog.content"
                  required
                ></textarea>
              </div>

              <button type="submit" class="btn btn-primary w-100">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useBlogStore } from "../stores/blogStore";
import api from "../services/api";
import { Notyf } from "notyf";
const blogStore = useBlogStore();
const blogs = ref([]);
const selectedBlog = ref({});
import * as bootstrap from "bootstrap";
const notyf = new Notyf();

onMounted(() => {   
    fetchBlogs();
});


const fetchBlogs = async () => {
  try {
    const response = await api.get("/blogs/");
    blogs.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
};

const openModal = (blog) => {
  selectedBlog.value = { ...blog };
};

const updateBlog = async () => {
  try {
    await blogStore.editBlog(selectedBlog.value._id, selectedBlog.value);

    await fetchBlogs();

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("editModal")
    );
    modal.hide();
    notyf.success("Blog updated successfully!");
  } catch (error) {
    console.error("Error updating blog:", error);
    notyf.error("Failed to update blog.");
  }
};

const deleteBlog = async (blogId) => {
  if (!confirm("Are you sure you want to delete this blog?")) return;

  try {
    await blogStore.deleteBlog(blogId);
    await fetchBlogs();
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
};
</script>

<style scoped>
.card {
  width: 50%;
  margin: 0 auto;
}
</style>

<template>
  <div class="container-fluid mt-5">
    <h1 class="text-center mb-4">Edit Blog Posts</h1>

    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div v-if="blogs.length === 0" class="text-center text-muted">
          <p>You haven't written any blogs yet.</p>
          <RouterLink to="/post-blog" class="btn btn-primary">
            Write Your First Blog
          </RouterLink>
        </div>

        <div v-else>
          <div v-for="blog in blogs" :key="blog._id" class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ blog.title }}</h5>
              <p class="card-text">
                {{ blog.content.substring(0, 100) }}...
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
        </div>
      </div>
    </div>
    <!-- Modal for edit -->
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
import { useUserStore } from "../stores/userStore";
import { useBlogStore } from "../stores/blogStore";
import { onMounted, ref } from "vue";
import * as bootstrap from "bootstrap";

const userStore = useUserStore();
const blogStore = useBlogStore();

const blogs = ref([]);
const selectedBlog = ref({});

onMounted(() => {
  fetchBlogs();
});

const fetchBlogs = async () => {
  const response = await blogStore.fetchUserBlogs(userStore.user.id);
  blogs.value = response.data;
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
  } catch (error) {
    console.error("Error updating blog:", error);
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
<template>
  <div class="container py-5">
    <div class="mb-5">
      <h1 class="fw-bold mb-3">{{ blog.title }}</h1>

      <div class="text-muted mb-4">
        Written by <strong>{{ blog.author.username }}</strong> •
        {{ formatDate(blog.createdAt) }}
      </div>

      <div class="fs-5 lh-lg">
        {{ blog.content }}
      </div>
    </div>

    <hr class="my-5" />

    <div>
      <h4 class="fw-bold mb-4">Comments ({{ blog.comments?.length || 0 }})</h4>

      <div v-if="blog.comments && blog.comments.length > 0">
        <div
          v-for="(comment, index) in blog.comments"
          :key="index"
          class="card mb-3 border-0 shadow-sm"
        >
          <div class="card-body">
            <div class="fw-semibold">
              {{ comment.username }}
            </div>
            <div class="text-muted small mb-2">
              {{ formatDate(comment.createdAt) }}
            </div>
            <div>
              {{ comment.comment }}
            </div>

            <a
              v-if="userStore.user.isAdmin"
              class="btn btn-danger btn-sm"
              role="button"
              @click="removeComment(comment._id)"
            >
              Delete Comment
            </a>
          </div>
        </div>
      </div>

      <div v-else class="text-muted">No comments yet.</div>

      <div v-if="userStore.isAuthenticated" class="mt-4">
        <form @submit.prevent="submitComment">
          <div class="mb-3">
            <textarea
              class="form-control"
              rows="3"
              placeholder="Write your comment..."
              v-model="newComment"
              required
            ></textarea>
          </div>
          <button class="btn btn-dark">Post Comment</button>
        </form>
      </div>

      <div v-else class="alert alert-light mt-4">
        Please log in to leave a comment.
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useBlogStore } from "../stores/blogStore";
import { useUserStore } from "../stores/userStore";
import { useRoute } from "vue-router";

const route = useRoute();
const blogId = route.params.id;
const blogStore = useBlogStore();
const userStore = useUserStore();
const blog = reactive({
  title: "",
  content: "",
  author: { username: "" },
  comments: [],
});
const newComment = ref("");

onMounted(async () => {
  try {
    const fetchedBlog = await blogStore.fetchBlogById(blogId);
    Object.assign(blog, fetchedBlog);
  } catch (error) {
    console.error("Error fetching blog details:", error);
  }
});

const submitComment = async () => {
  try {
    const commentData = {
      userId: userStore.user.id,
      comment: newComment.value,
      username: userStore.user.username,
    };
    const updatedBlog = await blogStore.addComment(blogId, commentData);
    Object.assign(blog, updatedBlog);
    newComment.value = "";
  } catch (error) {
    console.error("Error submitting comment:", error);
  }
};

const removeComment = async (commentId) => {
  try {
    const updatedBlog = await blogStore.deleteComment(blogId, commentId);
    Object.assign(blog, updatedBlog);
  } catch (error) {
    console.error("Error removing comment:", error);
  }
};
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
};
</script>

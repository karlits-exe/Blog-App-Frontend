import api from "../services/api";
import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import { ref, reactive, computed } from "vue";

export const useBlogStore = defineStore("blog", () => {
  const blogs = reactive([]);
  const userStore = useUserStore();

  const fetchBlogs = async () => {
    try {
      const response = await api.get("/blogs/", {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      blogs = response.data;
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

    const createBlog = async (blogData) => {
    try {
      const response = await api.post("/blogs/", blogData, {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      blogs.push(response.data);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const editBlog = async (blogId, updatedData) => {
    try {
      const response = await api.put(`/blogs/${blogId}/`, updatedData, {
        headers: { Authorization: `Bearer ${userStore.token}` },
      });
      const index = blogs.findIndex((blog) => blog.id === blogId);
      if (index !== -1) {
        blogs[index] = response.data;
      }
    } catch (error) {
      console.error("Error editing blog:", error);
    }
  };

  const deleteBlog= async (blogId) => {
    const response = await api.delete(`blogs/${blogId}`, {
      headers: { Authorization: `Bearer ${userStore.token}` },
    });
    if (response.status === 204) {
      const index = blogs.findIndex((blog) => blog.id === blogId);
      if (index !== -1) {
        blogs.splice(index, 1);
      }
    } else {
      console.error("Error deleting blog:", response.statusText);
    }
  }

  const fetchUserBlogs = async (userId) => {
    try {
      const response = await api.get(`/blogs/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error fetching user blogs:", error);
    }
  };

  const fetchBlogById = async (blogId) => {
    try {
      const response = await api.get(`/blogs/${blogId}/`, {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching blog by ID:", error);
    }
  };

  const addComment = async (blogId, commentData) => {
    try {
      const response = await api.post(`/blogs/${blogId}/comments/`, commentData, {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const deleteComment = async (blogId, commentId) => {
  try {
    const response = await api.delete(`/blogs/${blogId}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${userStore.token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};

  return {
    blogs,
    fetchBlogById,
    fetchBlogs,
    createBlog,
    editBlog,
    deleteBlog,
    fetchUserBlogs,
    addComment,
    deleteComment
  };
});


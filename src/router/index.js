import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import BlogsPage from "../pages/BlogsPage.vue";
import BlogDetails from '../components/BlogDetails.vue';
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import { useUserStore } from "../stores/userStore";
import PostBlog from "../pages/PostBlog.vue";
import EditBlog from "../pages/EditBlogs.vue";
import EditBlogsAdminPage from "../pages/EditBlogsAdminPage.vue";
const routes = [
  { path: "/", component: HomePage },
  {
    path: "/blogs/:id",
    component: BlogDetails,
    meta: { requiresAuth: true },
  },
  { path: "/blogs", component: BlogsPage, meta: { requiresAuth: true } },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/post-blog", component: PostBlog, meta: { requiresAuth: true } },
  { path: "/edit-blog", component: EditBlog, meta: { requiresAuth: true } },
  { path: "/edit-blog-admin", component: EditBlogsAdminPage, meta: { requiresAuth: true, isAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;

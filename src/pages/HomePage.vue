<template>
  <div>

    <!-- HERO -->
    <section class="hero-section text-white text-center d-flex align-items-center">
      <div class="container">
        <h1 class="display-3 fw-bold mb-3">The Daily Ink</h1>
        <p class="lead mb-4 opacity-75">
          Stories that matter. Perspectives that challenge. Writing that stays with you.
        </p>

        <div class="d-flex gap-3 justify-content-center flex-wrap">
          <RouterLink to="/blogs" class="btn btn-warning btn-lg px-4 shadow">
            Read the Blog
          </RouterLink>

          <RouterLink
            v-if="!userStore.isAuthenticated"
            to="/register"
            class="btn btn-outline-light btn-lg px-4"
          >
            Join Us
          </RouterLink>

          <RouterLink
            v-else
            to="/blogs/create"
            class="btn btn-outline-light btn-lg px-4"
          >
            Write a Post
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-md-5">
            <h2 class="fw-bold mb-3">A place for ideas worth sharing</h2>
            <p class="text-muted">
              The Daily Ink is a community-driven platform where curious minds
              come to read, write, and connect.
            </p>
          </div>

          <div class="col-md-7">
            <div class="row g-4">
              <div
                class="col-4"
                v-for="item in pillars"
                :key="item.label"
              >
                <div class="pillar-card text-center p-4 rounded shadow-sm h-100">
                  <div class="fs-1 mb-2">{{ item.icon }}</div>
                  <h6 class="fw-bold text-uppercase text-muted">
                    {{ item.label }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED POSTS PREVIEW -->
    <section class="py-5">
      <div class="container">
        <h2 class="fw-bold text-center mb-5">Why Readers Love Us</h2>

        <div class="row g-4">
          <div class="col-md-4" v-for="feature in features" :key="feature.title">
            <div class="card border-0 shadow-sm h-100 feature-card">
              <div class="card-body text-center p-4">
                <div class="fs-2 mb-3">{{ feature.icon }}</div>
                <h5 class="fw-bold">{{ feature.title }}</h5>
                <p class="text-muted small">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section
      class="cta-section text-white text-center py-5"
      v-if="!userStore.isAuthenticated"
    >
      <div class="container">
        <h2 class="fw-bold mb-3">Got something to say?</h2>
        <p class="opacity-75 mb-4">
          Join the community and share your perspective.
        </p>

        <div class="d-flex gap-3 justify-content-center flex-wrap">
          <RouterLink to="/register" class="btn btn-warning btn-lg px-4">
            Create Account
          </RouterLink>
          <RouterLink to="/login" class="btn btn-outline-light btn-lg px-4">
            Sign In
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-dark text-white text-center py-4">
      <div class="container small opacity-75">
        © 2026 The Daily Ink · Built with Vue & Passion
      </div>
    </footer>

  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();

const pillars = [
  { icon: "✍️", label: "Write" },
  { icon: "📖", label: "Read" },
  { icon: "🤝", label: "Connect" },
];

const features = [
  {
    icon: "🔥",
    title: "Fresh Perspectives",
    description: "Discover unique insights from writers around the world."
  },
  {
    icon: "⚡",
    title: "Fast & Simple",
    description: "Clean reading experience with distraction-free design."
  },
  {
    icon: "🌍",
    title: "Community Driven",
    description: "Engage, comment, and connect with thoughtful creators."
  }
];
</script>

<style scoped>
.hero-section {
  min-height: 90vh;
  background: linear-gradient(135deg, #111 0%, #343a40 100%);
}

.pillar-card {
  transition: all 0.3s ease;
  background: white;
}

.pillar-card:hover {
  transform: translateY(-5px);
}

.feature-card {
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.cta-section {
  background: linear-gradient(135deg, #212529 0%, #000 100%);
}
</style>
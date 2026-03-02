<template>
    <div class="container-fluid mt-5">
    <h1 class="text-center mb-4">Create a New Blog Post</h1>
    <form @submit.prevent="submitBlog" class="w-50 mx-auto">
        <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" v-model="state.title" required>
        </div>
        <div class="mb-3">
            <label for="content" class="form-label">Content</label>
            <textarea class="form-control" id="content" rows="5" v-model="state.content" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    </div>
</template>

<script setup>
    import { reactive } from "vue";
    import { useUserStore } from "../stores/userStore";
    import { useBlogStore } from "../stores/blogStore";
    import { Notyf } from "notyf";
    const userStore = useUserStore();
    const blogStore = useBlogStore();
    const notyf = new Notyf();
    
    const state = reactive({
        title: "",
        content: "",
        author: {
            userId: userStore.user.id,
            username: userStore.user.username
        }
    });

    const submitBlog = async () => {
        try {
            await blogStore.createBlog({
                title: state.title,
                content: state.content,
                author: state.author
            });
            notyf.success("Blog post created successfully!");

            state.title = "";
            state.content = ""; 
        } catch (error) {
            console.error("Error creating blog:", error);
            notyf.error("Failed to create blog post.");
        }
    };
</script>
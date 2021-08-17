<template>
  <div class="admin-page">
    <section class="new-post">
      <AppButton @click="$router.push('/admin/new-post')"
        >Create Post</AppButton
      >
    </section>

    <section class="existing-posts">
      <h1>Existing posts</h1>
      <PostList :posts="loadedPosts" />
    </section>
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";
import AppButton from "@/components/UI/AppButton";

export default {
  layout: "admin",
  components: {
    PostList,
    AppButton
  },
  data() {
    return {
      loadedPosts: [
        {
          id: "1",
          title: "first",
          previewText: "first post",
          thumnail:
            "http://ecolonomics.org/wp-content/uploads/2015/09/alpaca-43324_1280.jpg"
        },
        {
          id: "2",
          title: "second",
          previewText: "second post",
          thumnail:
            "http://ecolonomics.org/wp-content/uploads/2015/09/alpaca-43324_1280.jpg"
        }
      ]
    };
  }
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>

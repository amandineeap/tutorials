<template>
  <section class="post-list">
    <PostPreview
      id="1"
      :is-admin="isAdmin"
      title="post 1"
      previewText="first post"
      thumbnail="http://ecolonomics.org/wp-content/uploads/2015/09/alpaca-43324_1280.jpg"
    />
    <PostPreview
      id="2"
      :is-admin="isAdmin"
      title="post 2"
      previewText="second post"
      thumbnail="https://d.newsweek.com/en/full/1245050/12-5-alpaca.jpg"
    />
    <PostPreview
      id="3"
      :is-admin="true"
      title="post 3"
      previewText="third post"
      thumbnail="https://www.havealovelytime.com/wp-content/uploads/2019/03/Alpaca-Experiences-UK.jpg"
    />
  </section>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview.vue";
export default {
  name: "PostList",
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>

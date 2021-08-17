<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script>
import PostList from "@/components/Posts/PostList.vue";
export default {
  components: {
    PostList
  },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    }
  }
  // can run either on server on first load or on client
  // fetch(context) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({
  //         loadedPosts: [
  //           {
  //             id: "1",
  //             title: "first",
  //             previewText: "first post",
  //             thumbnail:
  //               "http://ecolonomics.org/wp-content/uploads/2015/09/alpaca-43324_1280.jpg"
  //           },
  //           {
  //             id: "2",
  //             title: "second",
  //             previewText: "second post",
  //             thumbnail:
  //               "http://ecolonomics.org/wp-content/uploads/2015/09/alpaca-43324_1280.jpg"
  //           }
  //         ]
  //       });
  //     }, 2000);
  //   })
  //     .then(data => {
  //       context.store.commit("setPosts", data.loadedPosts);
  //     })
  //     .catch(e => {
  //       context.error(e);
  //     });
  // },

  // ONLY available in pages - executed on the server
  // asyncData(context) {
  //   // needs to return a Promise, either with new Promise (), axios promise or with callback
  //   // cannot use 'this' in here as it runs before on server side

  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({
  //         loadedPosts: [
  //           {
  //             id: "1",
  //             title: "first",
  //             previewText: "first post",
  //             thumbnail:
  //               "http://ecolonomics.org/wp-content/uploads/2015/09/alpaca-43324_1280.jpg"
  //           },
  //           {
  //             id: "2",
  //             title: "second",
  //             previewText: "second post",
  //             thumbnail:
  //               "http://ecolonomics.org/wp-content/uploads/2015/09/alpaca-43324_1280.jpg"
  //           }
  //         ]
  //       });
  //     }, 2000);
  //     // reject(new Error());
  //   })
  //     .then(data => {
  //       return data;
  //     })
  //     .catch(e => {
  //       context.error(e);
  //     });
  // },
  // data() {
  //   return {
  //     loadedPosts: [
  //       {
  //         id: "1",
  //         title: "first",
  //         previewText: "first post",
  //         thumbnail:
  //           "http://ecolonomics.org/wp-content/uploads/2015/09/alpaca-43324_1280.jpg"
  //       },
  //       {
  //         id: "2",
  //         title: "second",
  //         previewText: "second post",
  //         thumbnail:
  //           "http://ecolonomics.org/wp-content/uploads/2015/09/alpaca-43324_1280.jpg"
  //       }
  //     ]
  //   };
  // }
  // created() {
  //   this.$store.dispatch("setPosts", this.loadedPosts);
  //   // console.log(this.$store.getters.loadedPosts);
  // }
};
</script>

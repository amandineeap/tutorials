<template>
  <div class="home-page">
    <section class="intro">
      <h1>Alpacas doing silly things!</h1>
    </section>
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList.vue";
export default {
  components: {
    PostList
  },

  // only available in pages - executed on the server
  asyncData(context, callback) {
    // needs to return a Promise, either with new Promise (), axios promise or with callback
    // cannot use 'this' in here as it runs before on server side
    setTimeout(() => {
      callback(null, {
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
      });
    }, 2000);
  }
  // remove data() as it would run on the client and override the asyncData data
  //   data() {
  //   return {
  //     loadedPosts: []
  //   };
  // },
  // created() {
  //   setTimeout(() => {
  //     this.loadedPosts = [
  //       {
  //         id: 1,
  //         title: "first",
  //         previewText: "first post",
  //         thumnail:
  //           "http://ecolonomics.org/wp-content/uploads/2015/09/alpaca-43324_1280.jpg"
  //       },
  //       {
  //         id: 2,
  //         title: "second",
  //         previewText: "second post",
  //         thumnail:
  //           "http://ecolonomics.org/wp-content/uploads/2015/09/alpaca-43324_1280.jpg"
  //       }
  //     ];
  //   }, 2000);
  // }
};
</script>

<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url("~assets/images/main-page-background.jpg");
  background-position: center;
  background-size: cover;
}
</style>

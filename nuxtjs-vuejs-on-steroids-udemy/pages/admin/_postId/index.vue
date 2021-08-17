<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";
import axios from "axios";

export default {
  layout: "admin",
  components: {
    AdminPostForm
  },
  asyncData(context) {
    // , callback
    return axios
      .get(
        "https://nuxtjs-vuejs-on-steroid-default-rtdb.europe-west1.firebasedatabase.app/posts/" +
          context.route.params.postId +
          ".json"
      )
      .then(res => {
        return { loadedPost: { ...res.data, id: context.route.params.postId } };
      })
      .catch(e => context.error(e));
  },
  methods: {
    onSubmitted(editedPost) {
      this.$store.dispatch("editPost", editedPost).then(() => {
        this.$router.push("/admin");
      });
      // axios
      //   .put(
      //     "https://nuxtjs-vuejs-on-steroid-default-rtdb.europe-west1.firebasedatabase.app/posts/" +
      //       this.$route.params.postId +
      //       ".json",
      //     editedPost
      //   )
      //   .then(res => {
      //     this.$router.push("/admin");
      //   })
      //   .catch(e => console.log(e));
    }
  }
  // data() {
  //   return {
  //     loadedPost: {
  //       author: "test",
  //       title: "my post",
  //       content: "wooo",
  //       thumbnail:
  //         "https://www.havealovelytime.com/wp-content/uploads/2019/03/Alpaca-Experiences-UK.jpg"
  //     }
  //   };
  // }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>

<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">
        {{ loadedPost.title }}
      </h1>
      <div class="post-details">
        <div>Last updated on {{ loadedPost.updatedDate }}</div>
        <div>Written by {{ loadedPost.author }}</div>
        <p class="post-detail">{{ loadedPost.content }}</p>
      </div>
    </section>
    <section class="post-feedback">
      <p>Feedback <a href="mailto:mail@mail.com">mail@mail.com</a></p>
    </section>
  </div>
</template>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>

<script>
export default {
  asyncData(context, callback) {
    setTimeout(() => {
      callback(null, {
        loadedPost: {
          id: "1",
          title: "post with (ID: " + context.route.params.id + ")",
          previewText: "first post",
          author: "Amandine",
          updatedDate: new Date(),
          content: "full content bla bla bla bla bla bla",
          thumnail:
            "http://ecolonomics.org/wp-content/uploads/2015/09/alpaca-43324_1280.jpg"
        }
      });
    }, 1000);
  }
};
</script>

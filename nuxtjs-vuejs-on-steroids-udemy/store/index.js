import Vuex from "vuex";
import axios from "axios";

// new store per user
const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[postIndex] = editedPost;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get(
            "https://nuxtjs-vuejs-on-steroid-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
          )
          .then(res => {
            const postsArray = [];
            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key });
            }
            vuexContext.commit("setPosts", postsArray);
          })
          .catch(e => context.error(e));
        // return new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     vuexContext.commit("setPosts", [
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
        //     ]);
        //     resolve();
        //   }, 1000);
        // });
      },
      addPost(vuexContext, post) {
        const createdPost = { ...post, updatedDate: new Date() };
        return axios
          .post(
            "https://nuxtjs-vuejs-on-steroid-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
            createdPost
          )
          .then(result => {
            vuexContext.commit("addPost", {
              ...createdPost,
              id: result.data.name
            });
          })
          .catch(e => console.log(e));
      },
      editPost(vuexContext, editedPost) {
        return axios
          .put(
            "https://nuxtjs-vuejs-on-steroid-default-rtdb.europe-west1.firebasedatabase.app/posts/" +
              editedPost.id +
              ".json",
            editedPost
          )
          .then(result => {
            vuexContext.commit("editPost", editedPost);
          })
          .catch(e => console.log(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};
export default createStore;

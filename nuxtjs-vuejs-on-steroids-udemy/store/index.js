import Vuex from "vuex";

// new store per user
const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            vuexContext.commit("setPosts", [
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
            ]);
            resolve();
          }, 1000);
        });
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

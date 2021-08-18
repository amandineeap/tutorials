import Vuex from "vuex";
import axios from "axios";
import Cookie from "js-cookie";

// new store per user
// gets reset on every page refresh
const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
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
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios // @nuxtjs/axios module instead
          .$get("/posts.json") // with module, no need to add baseURL
          .then(data => {
            // with module, returns the data directly not res no need to do res.data
            const postsArray = [];
            for (const key in data) {
              postsArray.push({ ...data[key], id: key });
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
          .post(process.env.baseUrl + "/posts.json", createdPost)
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
            process.env.baseUrl +
              "/posts/" +
              editedPost.id +
              ".json?auth=" +
              vuexContext.state.token,
            editedPost
          )
          .then(result => {
            vuexContext.commit("editPost", editedPost);
          })
          .catch(e => console.log(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      authenticateUser(vuexContext, authData) {
        let authUrl =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          process.env.fbAPIKey;
        if (authData.isLogin) {
          authUrl =
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
            process.env.fbAPIKey;
        }
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            vuexContext.commit("setToken", result.idToken);
            localStorage.setItem("token", result.idToken);
            localStorage.setItem(
              "tokenExpiration",
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000 // parse to number with +result.expiresIn or Number.parseInt(result.expiresIn)
            );
            Cookie.set("jwt", result.idToken);
            Cookie.set(
              "expirationDate",
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            );
            return this.$axios.$post("http://localhost:3000/api/track-data", {
              data: "Authenticated!"
            });
            // vuexContext.dispatch("setLogoutTimer", result.expiresIn * 1000);
          })
          .catch(e => console.log(e));
      },
      setLogoutTimer(vuexContext, duration) {
        setTimeout(() => {
          vuexContext.commit("clearToken");
        }, duration);
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else {
          // cant access local storage on server > process.client check in check-auth middleware
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }
        // if no token or invalid token
        if (new Date() > +expirationDate || !token) {
          // vuexContext.commit("clearToken");
          vuexContext.dispatch("logout");
          return;
        }

        // vuexContext.dispatch(
        //   "setLogoutTimer",
        //   +expirationDate - new Date().getTime()
        // );
        vuexContext.commit("setToken", token);
      },
      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.token != null;
      }
    }
  });
};
export default createStore;

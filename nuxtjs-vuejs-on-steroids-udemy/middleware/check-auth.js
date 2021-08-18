export default context => {
  // if (process.client) {
  //   context.store.dispath("initAuth", null);
  // }

  context.store.dispatch("initAuth", context.req);
};

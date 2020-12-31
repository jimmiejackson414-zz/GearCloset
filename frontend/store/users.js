export const state = () => ({
  currentUser: {},
  friends: []
});

export const mutations = {
  login (state) {
    console.log('login state: ', state);
  }
};

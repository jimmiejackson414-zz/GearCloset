import { randBackgrounds } from '~/helpers';

export const state = () => ({
  background: {},
  loading: true
});

export const mutations = {
  generateBackground (state) {
    state.background = randBackgrounds[Math.floor(Math.random() * randBackgrounds.length)];
    state.loading = false;
  }
};

import Pack from './models/pack';
import Trip from './models/trip';
import { packService } from '~/services';

export const state = () => ({});

export const mutations = {};

export const actions = {
  async fetchPacks ({ commit }) {
    const token = this.$cookies.get('gc_token');
    const payload = { graphql: this.$graphql, token };

    const { packs } = await packService.getPacks(payload);
    Pack.insertOrUpdate({
      data: [...packs]
    });
  },
  async update ({ commit }, payload) {
    const token = this.$cookies.get('gc_token');
    payload.graphql = this.$graphql;
    payload.token = token;

    const { updatePack } = await packService.update(payload);
    Pack.insertOrUpdate({
      data: [{ ...updatePack }]
    });

    if (payload?.updateTrip) {
      Trip.update({
        where: payload.variables.id,
        data: {
          pack_id: payload.variables.pack_id
        }
      });
    }
  }
};

const supabase = require('../config/supabase');

const PlayerModel = {
  getAll: async () => {
    return await supabase.from('players').select('*').eq('is_active', true);
  },

  getById: async (id) => {
    return await supabase.from('players').select('*').eq('player_id', id).single();
  },

  getByRole: async (role) => {
    return await supabase.from('players').select('*').eq('role', role).eq('is_active', true);
  },

  create: async (playerData) => {
    return await supabase.from('players').insert(playerData).select().single();
  },

  update: async (id, updates) => {
    return await supabase.from('players').update(updates).eq('player_id', id).select().single();
  },
};

module.exports = PlayerModel;

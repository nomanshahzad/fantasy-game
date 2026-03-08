const supabase = require('../config/supabase');

const TeamModel = {
  getAll: async () => {
    return await supabase.from('fantasy_teams').select('*, users(username)');
  },

  getById: async (id) => {
    return await supabase.from('fantasy_teams').select('*, users(username)').eq('team_id', id).single();
  },

  getByUserId: async (userId) => {
    return await supabase.from('fantasy_teams').select('*').eq('user_id', userId).single();
  },

  getTeamPlayers: async (teamId) => {
    return await supabase
      .from('fantasy_team_players')
      .select('*, players(*)')
      .eq('team_id', teamId);
  },

  create: async (teamData) => {
    return await supabase.from('fantasy_teams').insert(teamData).select().single();
  },

  addPlayer: async (teamPlayerData) => {
    return await supabase.from('fantasy_team_players').insert(teamPlayerData).select().single();
  },

  removePlayer: async (teamId, playerId) => {
    return await supabase.from('fantasy_team_players').delete().eq('team_id', teamId).eq('player_id', playerId);
  },

  update: async (id, updates) => {
    return await supabase.from('fantasy_teams').update(updates).eq('team_id', id).select().single();
  },
};

module.exports = TeamModel;

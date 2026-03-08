const supabase = require('../config/supabase');

const LeaderboardModel = {
  getOverall: async () => {
    return await supabase
      .from('users')
      .select('user_id, username, total_points, fantasy_teams(team_name)')
      .order('total_points', { ascending: false });
  },

  getMatchScores: async (matchId) => {
    return await supabase
      .from('scores')
      .select('*, players(name, role, real_team)')
      .eq('match_id', matchId)
      .order('fantasy_points', { ascending: false });
  },
};

module.exports = LeaderboardModel;

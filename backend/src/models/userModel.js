const supabase = require('../config/supabase');

const UserModel = {
  getAll: async () => {
    return await supabase.from('users').select('user_id, username, email, is_admin, transfers_used, total_points, created_at');
  },

  getById: async (id) => {
    return await supabase.from('users').select('user_id, username, email, is_admin, transfers_used, total_points, created_at').eq('user_id', id).single();
  },

  getByEmail: async (email) => {
    return await supabase.from('users').select('*').eq('email', email).single();
  },

  create: async (userData) => {
    return await supabase.from('users').insert(userData).select().single();
  },

  update: async (id, updates) => {
    return await supabase.from('users').update(updates).eq('user_id', id).select().single();
  },
};

module.exports = UserModel;

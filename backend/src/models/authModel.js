const supabase = require('../config/supabase');

const AuthModel = {
  signup: async ({ email, password, username }) => {
    // 1. Create auth user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) throw authError;

    // 2. Create record in our users table linked by auth_id
    const { data, error } = await supabase.from('users').insert({
      auth_id: authData.user.id,
      username,
      email,
    }).select().single();
    if (error) throw error;

    return { user: data, session: authData.session };
  },

  signin: async ({ email, password }) => {
    // 1. Sign in via Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    // 2. Fetch our user record from users table
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', data.user.id)
      .single();

    return { session: data.session, user: userData };
  },

  getUser: async (token) => {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) throw error;
    return data.user;
  },
};

module.exports = AuthModel;

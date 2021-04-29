const { APIUsers } = require('./baseService');

const getUser = async (userID, token) => {
  try {
    const user = await APIUsers.get(`/users/${userID}`, { headers: { 'x-access-token': token } })
      .then((response) => response.data);
    if (!user) {
      return { error: 'User not found' };
    }
    return user;
  } catch {
    return { error: 'Could not connect to user api' };
  }
};

module.exports = { getUser };
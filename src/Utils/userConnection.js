const axios = require('axios');

const getUser = async (userID, token) => {
  try {
    const user = await axios.get(`http://${process.env.USERS_URL}:3001/users/${userID}`, { headers: { 'x-access-token': token } })
      .then((response) => response.data);
    return user;
  } catch (err) {
    console.log(err);
    return { error: 'Could not connect to user api' };
  }
};

const checkUserPermission = async (userID, token) => {
  const user = await getUser(userID, token);
  if (!user) {
    return { error: 'User not found' };
  }
  return user;
};

module.exports = { getUser, checkUserPermission };

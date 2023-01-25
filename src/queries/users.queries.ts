const addUser =
  "INSERT INTO users (email, user_name, first_name , last_name , password) VALUES($1, $2, $3, $4,$5) returning id, email, user_name, first_name, last_name";
const getUsers = `SELECT id, email, user_name, first_name, last_name FROM users`;
const getUserById = `SELECT id, email, user_name, first_name, last_name FROM users WHERE id=($1)`;
const updateUser = `UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6 returning id, email, user_name, first_name, last_name`;
const removeUser = `DELETE FROM users WHERE id=($1) returning id, email, user_name, first_name, last_name`;
const checkAuthenticateUserExists = `SELECT id, email, user_name, first_name, last_name FROM users WHERE email=($1)`;

export default {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  removeUser,
  checkAuthenticateUserExists,
};

// @ts-ignore
import pool from "../database/index";
import usersQueries from "../queries/users.queries";
import User from "../types/user.type";
import config from "../config/config";
import bcrypt from "bcrypt";

const hashPassword = (password: string | any) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
};
class UserModel {
  // create user
  async createUser(u: User): Promise<User> {
    try {
      // open connection with database
      const connection = await pool.connect();
      const sql = usersQueries.addUser;
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassword(u.password),
      ]);
      // release connection
      connection.release();
      // return created user
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`);
    }
  }
  //get all users
  async getUsers(): Promise<User[]> {
    try {
      const connection = await pool.connect();
      const sql = usersQueries.getUsers;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error at retrieving users ${(error as Error).message}`);
    }
  }

  //get specific user
  async getUserById(id: string): Promise<User> {
    try {
      const sql = usersQueries.getUserById;
      const connection = await pool.connect();
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user ${id}, ${(error as Error).message}`);
    }
  }

  //update user
  async updateUser(u: User): Promise<User> {
    try {
      const connection = await pool.connect();
      const sql = `UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6 RETURNING id, email, user_name, first_name, last_name`;
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassword(u.password),
        u.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Could not update user: ${u.user_name}, ${(error as Error).message}`
      );
    }
  }
  //delete user
  async removeUser(id: string): Promise<User> {
    try {
      const connection = await pool.connect();
      const sql = usersQueries.removeUser;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `could not delete user ${id},${(error as Error).message}`
      );
    }
  }
  //authinticate user
  async authenticateUser(
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const connection = await pool.connect();
      const sql = `SELECT password FROM users WHERE email=$1`;
      const result = await connection.query(sql, [email]);
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPassword
        );
        if (isPasswordValid) {
          const userInfo = await connection.query(
            `SELECT id, email, user_name, first_name, last_name FROM users WHERE email=($1)`,
            [email]
          );
          return userInfo.rows[0];
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error(`Unable to login: ${(error as Error).message}`);
    }
  }
}
export default UserModel;

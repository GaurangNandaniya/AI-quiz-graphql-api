import { db } from "Clients";
import _ from "lodash";

export const createUser = async (newUser) => {
  const { firstName, lastName, email, password } = newUser;

  const query = db("auth.user")
    .insert({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      created_at: db.fn.now(),
    })
    .returning("*");

  console.log(query.toString());

  return await query;
};

export const fetchUserByEmail = async (data) => {
  const { email } = data;

  const result = await db("auth.user as u")
    .select("*")
    .where("u.is_deleted", false)
    .where("u.email", email);
  return _.first(result);
};

export const fetchUserById = async (data) => {
  const { id } = data;

  const result = await db("auth.user as u")
    .select("*")
    .where("u.is_deleted", false)
    .where("u.id", id);
  return _.first(result);
};

export const fetchUserByAuthProvider = async (data) => {
  const { authProvider, providerId } = data;
  const query = db
    .select("*")
    .from("public.user as u")
    .where("u.auth_provider", authProvider)
    .where("u.provider_id", providerId)
    .where("u.is_deleted", false);

  const result = await query;

  return _.first(result);
};

/**
 * This is a partial @User. It's intended only for the login
 *
 * @param username string An unique identifier in our DB
 * @param password string A Base64 encoded string representing the password
 */
export interface Login {
  username: string;
  password: string;
}

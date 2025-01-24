export default function authenticated(password, passwordDb) {
  return password == passwordDb;
}

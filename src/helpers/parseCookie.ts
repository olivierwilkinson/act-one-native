export default function parseConnectCookie(cookie: string) {
  const lastConnectCookie = cookie
    .split(/;|,/)
    .findLast(cookie => cookie.includes("connect.sid"));

  if (!lastConnectCookie) {
    return null;
  }

  return lastConnectCookie.trim();
}

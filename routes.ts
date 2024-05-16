export const publicRoutes = ["/", "/auth/new-verification"];

//An array of routes that are used for authentication, these routes will redirect loggedin users to settings page
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

//the prefix for API authentication routes,routes that starts with prefix are used for API authentications purpose
// @type{string}
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";

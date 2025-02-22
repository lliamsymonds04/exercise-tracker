import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/login", "routes/login.tsx"),
    route("/home", "routes/home.tsx"),

] satisfies RouteConfig;

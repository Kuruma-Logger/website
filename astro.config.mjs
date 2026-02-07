import { defineConfig } from "astro/config";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const owner = process.env.GITHUB_REPOSITORY_OWNER;

const site =
  process.env.PUBLIC_SITE_URL ||
  (isGithubActions && owner ? `https://${owner}.github.io` : "http://localhost:4321");

const base =
  process.env.PUBLIC_BASE_PATH ||
  (isGithubActions && repoName ? `/${repoName}` : "/");

export default defineConfig({
  site,
  base,
  output: "static"
});

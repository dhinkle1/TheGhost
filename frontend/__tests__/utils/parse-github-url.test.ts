import { expect, test } from "vitest";
import { parseGithubUrl } from "../../src/utils/parse-github-url";

test("parseGithubUrl", () => {
  expect(
    parseGithubUrl("https://github.com/alexreardon/tiny-invariant"),
  ).toEqual(["alexreardon", "tiny-invariant"]);

  expect(parseGithubUrl("https://github.com/All-Hands-AI/TheGhost")).toEqual([
    "All-Hands-AI",
    "TheGhost",
  ]);

  expect(parseGithubUrl("https://github.com/All-Hands-AI/")).toEqual([
    "All-Hands-AI",
    "",
  ]);

  expect(parseGithubUrl("https://github.com/")).toEqual([]);
});

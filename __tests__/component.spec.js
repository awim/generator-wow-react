"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-wow-react:component", () => {
  beforeEach(done => {
    helpers
      .run(path.join(__dirname, "../generators/component"))
      .withArguments(["Awesome"])
      .on("end", done);
  });

  it("creates files", () => {
    assert.file([
      "Awesome.tsx",
      "awesome.helper.ts",
      "awesome.scss",
      "__story__/awesome.story.tsx",
      "__story__/awesome.story.mdx"
    ]);
  });
});

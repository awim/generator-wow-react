const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

const componentName = "Awesome";

describe("generator-wow-react:component", () => {
  beforeEach(async () => {
    await helpers
      .run(path.join(__dirname, "../generators/component"))
      .withArguments([componentName]);
  });

  it("creates files", () => {
    assert.file([
      "Awesome.tsx",
      "AwesomeHelper.ts",
      "Awesome.scss",
      "story/Awesome.story.tsx",
      "story/Awesome.story.mdx"
    ]);
  });
});

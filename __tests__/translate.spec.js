const assert = require("yeoman-assert");
const { translate } = require("../utils/translate");

const TranslateParams = {
  libretranslateUrl: "http://innovatech.lab1:5000/translate",
  apiKey: "6067ca3d-87b6-4f1a-98a0-a4cdfa2492d5",
  q: "You are my sunshine, My only sunshine",
  source: "en",
  target: "id"
};

describe("testing translate", async () => {
  it("should translate 'You are my sunshine, My only sunshine' from en -> id", async () => {
    await translate(TranslateParams).then(response => {
      if (response) {
        assert.ok(response);
        assert.objectContent(response, {
          translatedText:
            "Anda adalah sinar matahari saya, saya hanya sinar matahari"
        });
      }
    });
  });
});

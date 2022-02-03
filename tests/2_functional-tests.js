const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

const Translator = require("../components/translator.js");
const translator = new Translator();

suite("Functional Tests", () => {
  test("Translation with text and locale fields: POST request to `/api/translate`", (done) => {
    const text = "Mangoes are my favorite fruit.";
    const locale = "american-to-british";
    const translation = translator.translate(input, locale, true);

    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: text,
        locale: locale,
      })
      .end((err, res) => {
        assert.equal(res.status, 200, "Response code should be 200");
        assert.deepEqual(
          res.body,
          {
            text: text,
            translation:
              translation,
          },
          "The server should respond with the correct translation"
        );
        done();
      });
  });

  test("Translation with text and invalid locale field: POST request to `/api/translate`", (done) => {
    const text = "Mangoes are my favorite fruit.";
    const locale = "foo";
    const errorMsg = "Invalid value for locale field";

    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: text,
        locale: locale,
      })
      .end((err, res) => {
        assert.equal(res.status, 200, "Response code should be 200");
        assert.deepEqual(
          res.body,
          {
            error: errorMsg,
          },
          "The server should display the correct error for an invalid locale"
        );
        done();
      });
  });

  test("Translation with missing text field: POST request to `/api/translate`", (done) => {
    const locale = "american-to-british";
    const errorMsg = "Required field(s) missing";

    chai
      .request(server)
      .post("/api/translate")
      .send({
        locale: locale,
      })
      .end((err, res) => {
        assert.equal(res.status, 200, "Response code should be 200");
        assert.deepEqual(
          res.body,
          {
            error: errorMsg,
          },
          "The server should display the correct error for a request without text field"
        );
        done();
      });
  });

  test("Translation with missing locale field: POST request to `/api/translate`", (done) => {
    const text = "Mangoes are my favorite fruit.";
    const errorMsg = "Required field(s) missing";

    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: text,
      })
      .end((err, res) => {
        assert.equal(res.status, 200, "Response code should be 200");
        assert.deepEqual(
          res.body,
          {
            error: errorMsg,
          },
          "The server should display the correct error for a request without locale field"
        );
        done();
      });
  });

  test("Translation with empty text: POST request to `/api/translate`", (done) => {
    const text = "";
    const locale = "american-to-british";
    const errorMsg = "No text to translate";

    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: text,
        locale: locale,
      })
      .end((err, res) => {
        assert.equal(res.status, 200, "Response code should be 200");
        assert.deepEqual(
          res.body,
          {
            error: errorMsg,
          },
          "The server should display the correct error for a request with an empty text field"
        );
        done();
      });
  });

  test("Translation with text that needs no translation: POST request to `/api/translate`", (done) => {
    const text = "Hello.";
    const locale = "american-to-british";
    const noTranslationNecessary = "Everything looks good to me!";

    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: text,
        locale: locale,
      })
      .end((err, res) => {
        assert.equal(res.status, 200, "Response code should be 200");
        assert.deepEqual(
          res.body,
          {
            "text": text,
            "translation": noTranslationNecessary,
          },
          "The server should respond correctly to a text that doesn't need any translation."
        );
        done();
      });
  });
});

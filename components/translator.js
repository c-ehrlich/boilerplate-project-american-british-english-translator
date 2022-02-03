const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  translate = (text, locale, highlightTranslatedWords) => {
    /**
     * INPUT SANITISING / ERROR HANDLING
     */
    if (!this._validateLocale(locale)) {
      return {
        error: "Invalid value for locale field",
      };
    }

    /**
     * TRANSLATION
     */

    // First character of the input is ALWAYS shifted to uppercase
    // other than that, case is ignored (including for example first char of the second sentence)

    // words get translated no matter what case they're in
    // the output translation is always the default case
    // UNLESS it's the first character of the entire string, then the
    // first letter gets capitalized. so probably do that last.

    // translated words get wrapped in `<span class=\"highlight\">WORD</span>
    let translation = "ERROR WITH TRANSLATION";
    if (locale === "american-to-british") {
      translation = this.translateAmericanToBritish(text, true);
    }
    if (locale === "british-to-american") {
      translation = this.translateBritishToAmerican(text, true);
    }

    // if there were no words that needed to be translated, we want to tell the user
    if (translation === text) {
      return {
        text: text,
        translation: "Everything looks good to me!",
      };
    }

    // translation successful
    return {
      text: text,
      translation: translation,
    };
  };

  translateAmericanToBritish = (text, highlightTranslatedWords) => {
    // use regexes!! or replace?
    // don't split the string because we have multiple-word things also
    // regex: /<word>/gmi matches global, multiline, not case sensitive
    // hi there. AcceSSorize => Hi there. accessorise
    //
    // for (key, value) in xyz
    //   text.replace(`/${key}/gmi`, value) // or the otehr way around
    //   for name strings we need to capitalise the first letter of value

    // translate words
    const prepend = highlightTranslatedWords ? '<span class="highlight">' : "";
    const append = highlightTranslatedWords ? "</span>" : "";

    for (const [key, value] of Object.entries(americanOnly)) {
      const wordRegex1 = new RegExp(key, "gmi"); // global, multiline, case insensitive
      text = text.replace(wordRegex1, `${prepend}${value}${append}`);
    }
    for (const [key, value] of Object.entries(americanToBritishSpelling)) {
      const wordRegex2 = new RegExp(key, "gmi"); // global, multiline, case insensitive
      text = text.replace(wordRegex2, `${prepend}${value}${append}`);
    }

    // translate titles
    for (const [key, value] of Object.entries(americanToBritishTitles)) {
      const titleRegex = new RegExp(key, "gmi");
      const capitaliseFirstLetter = (word) =>
        word.charAt(0).toUpperCase() + word.slice(1);
      text = text.replace(
        titleRegex,
        `${prepend}${capitaliseFirstLetter(value)}${append}`
      );
    }

    // translate times
    const timeRegex = new RegExp(/(?<=\d):(?=\d)/, "gmi");
    text = text.replace(timeRegex, ".");

    return text;
  };

  translateBritishToAmerican = (text, highlightTranslatedWords) => {
    const prepend = highlightTranslatedWords ? '<span class="highlight">' : "";
    const append = highlightTranslatedWords ? "</span>" : "";

    // translate words
    for (const [key, value] of Object.entries(americanToBritishSpelling)) {
      const wordRegex1 = new RegExp(`\\b${value}\\b`, "gmi"); // global, multiline, case insensitive
      text = text.replace(wordRegex1, `${prepend}${key}${append}`);
    }
    for (const [key, value] of Object.entries(britishOnly)) {
      const wordRegex2 = new RegExp(`\\b${key}\\b`, "gmi"); // global, multiline, case insensitive
      text = text.replace(wordRegex2, `${prepend}${value}${append}`);
    }

    // translate titles
    for (const [key, value] of Object.entries(americanToBritishTitles)) {
      const titleRegex = new RegExp(`\\b${value}\\b`, "gmi");
      const capitaliseFirstLetter = (word) =>
        word.charAt(0).toUpperCase() + word.slice(1);
      text = text.replace(
        titleRegex,
        `${prepend}${capitaliseFirstLetter(key)}${append}`
      );
    }

    // translate times
    const timeRegex = new RegExp(/(?<=\d).(?=\d)/, "gmi");
    text = text.replace(timeRegex, ":");

    return text;
  };

  _validateLocale = (locale) => {
    if (locale !== "american-to-british" && locale !== "british-to-american") {
      return false;
    }
    return true;
  };
}

module.exports = Translator;

/* eslint-disable max-lines */

import {
  capitalizeFirstLetter,
  noExtraSpaces,
  onlyUniqueWords,
  removeSpecialCharacters,
  stripCurlyBraces,
  stripHTMLTags,
  stripQueryStringsFromSrc,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
  toTitleCase,
} from './index';

describe('String Utilities', () => {
  describe('capitalizeFirstLetter', () => {
    it('Capitalizes first letter', () => {
      expect(capitalizeFirstLetter('foo')).toEqual('Foo');
      expect(capitalizeFirstLetter('Foo')).toEqual('Foo');
      expect(capitalizeFirstLetter('foo bar')).toEqual('Foo bar');
      expect(capitalizeFirstLetter('Foo bar')).toEqual('Foo bar');
      expect(capitalizeFirstLetter('')).toEqual('');
    });
  });

  describe('noExtraSpaces', () => {
    it('doesnt render extra spaces', () => {
      const assert1 = noExtraSpaces('this is fine');
      const assert2 = noExtraSpaces('this  is    not  fine');
      const assert3 = noExtraSpaces('hello there  sir');

      expect(typeof assert1).toBe('string');
      expect(assert1).toBe('this is fine');
      expect(assert2).toBe('this is not fine');
      expect(assert3).toBe('hello there sir');
    });
  });

  describe('onlyUniqueWords', () => {
    it('only return unique words in a string', () => {
      const assert1 = onlyUniqueWords('btn btn btn');
      const assert2 = onlyUniqueWords('this is completely unique');
      const assert3 = onlyUniqueWords('what what did you say?');
      const assert4 = onlyUniqueWords('btn btn-primary btn btn-primary');

      expect(typeof assert1).toBe('string');
      expect(assert1).toBe('btn');
      expect(assert2).toBe('this is completely unique');
      expect(assert3).toBe('what did you say?');
      expect(assert4).toBe('btn btn-primary');
    });
  });

  describe('removeSpecialCharacters', () => {
    it('strips the special characters out of a string', () => {
      const assert1 = removeSpecialCharacters('F?&erret &Fr?iday');
      const assert2 = removeSpecialCharacters('test str!ing');
      const assert3 = removeSpecialCharacters('good & plenty!');
      const assert4 = removeSpecialCharacters('#!$& sitecore!');

      expect(assert1).toBe('Ferret Friday');
      expect(assert2).toBe('test string');
      expect(assert3).toBe('good  plenty');
      expect(assert4).toBe('# sitecore');
    });
  });

  describe('stripCurlyBraces', () => {
    it('strips the curly braces out of a string', () => {
      const assert1 = stripCurlyBraces('{123-456}');
      const assert2 = stripCurlyBraces('{123-456');
      const assert3 = stripCurlyBraces('123-{456}');
      const assert4 = stripCurlyBraces('123-456}');

      expect(assert1).toBe('123-456');
      expect(assert2).toBe('123-456');
      expect(assert3).toBe('123-456');
      expect(assert4).toBe('123-456');
    });
  });

  describe('stripHTMLTags', () => {
    const data1 = '<div>hello world</div><b>This is bold</b>';
    const data2 = "'North Carolina'";
    const data3 = "Turtle's plural's shouldn't not pass";

    it('returns text and only text', () => {
      const assert1 = stripHTMLTags(data1);
      const assert2 = stripHTMLTags(data2);
      const assert3 = stripHTMLTags(data3);
      expect(assert1).toBe('hello worldThis is bold');
      expect(assert2).toBe('North Carolina');
      expect(assert3).toBe("Turtle's plural's shouldn't not pass");
    });
  });

  describe('stripQueryStringsFromSrc', () => {
    it('returns the src from a url without an querystring params', () => {
      const assert1 = stripQueryStringsFromSrc(
        'https://scdev25.duke-energy.com/_/media/images/hero2/192756-hero-ky-rate-case-desktop.jpg?h=490&la=en&w=1280'
      );
      const assert2 = stripQueryStringsFromSrc(
        'https://scdev25.duke-energy.com/_/media/images/hero2/192756-hero-ky-rate-case-desktop.jpg?h=490&la=en&w=1280&sky=blue'
      );
      const assert3 = stripQueryStringsFromSrc(
        'https://scdev25.duke-energy.com/_/media/images/hero2/192756-hero-ky-rate-case-desktop.jpg'
      );
      const expected =
        'https://scdev25.duke-energy.com/_/media/images/hero2/192756-hero-ky-rate-case-desktop.jpg';

      expect(assert1).toEqual(expected);
      expect(assert2).toEqual(expected);
      expect(assert3).toEqual(expected);
    });
  });

  describe('toKebabCase', () => {
    it('converts a string to kebab-case', () => {
      const assert1 = toKebabCase('two words');
      const assert2 = toKebabCase('Two Words');
      const assert3 = toKebabCase('TWO WORDS');

      expect(assert1).toBe('two-words');
      expect(assert2).toBe('two-words');
      expect(assert3).toBe('two-words');
    });
  });

  describe('toPascalCase', () => {
    it('converts a string to PascalCase', () => {
      const assert1 = toPascalCase('two words');
      const assert2 = toPascalCase('Two Words');
      const assert3 = toPascalCase('TWO WORDS');
      const assert4 = toPascalCase('tWo WoRdS');
      const assert5 = toPascalCase('twowords');
      const assert6 = toPascalCase('PageFrame');
      const assert7 = toPascalCase('pageFrame');

      expect(assert1).toBe('TwoWords');
      expect(assert2).toBe('TwoWords');
      expect(assert3).toBe('TwoWords');
      expect(assert4).toBe('TwoWords');
      expect(assert5).toBe('Twowords');
      expect(assert6).toBe('PageFrame');
      expect(assert7).toBe('PageFrame');
    });
  });

  describe('toSnakeCase', () => {
    it('converts a string to snake_case', () => {
      const assert1 = toSnakeCase('two words');
      const assert2 = toSnakeCase('Two Words');
      const assert3 = toSnakeCase('TWO WORDS');
      const assert4 = toSnakeCase('twowords');

      expect(assert1).toBe('two_words');
      expect(assert2).toBe('Two_Words');
      expect(assert3).toBe('TWO_WORDS');
      expect(assert4).toBe('twowords');
    });
  });

  describe('toTitleCase', () => {
    it('converts a string to Title Case', () => {
      const assert1 = toTitleCase('two words');
      const assert2 = toTitleCase('TwO woRdS');
      const assert3 = toTitleCase('TWO WORDS');
      const assert4 = toTitleCase('a');

      expect(assert1).toBe('Two Words');
      expect(assert2).toBe('Two Words');
      expect(assert3).toBe('Two Words');
      expect(assert4).toBe('A');
    });
  });
});

/* eslint-disable max-lines */
import {
  determineColumnSize,
  fieldIsHeading,
  fieldValidation,
  getCurrentFieldNames,
  isLiteralObject,
  masks,
} from './index';

describe('Form Utils', () => {
  describe('determineColumnSize', () => {
    it('returns the correct tailwind class given a column size', () => {
      const assert1 = determineColumnSize('0');
      const assert2 = determineColumnSize('1');
      const assert3 = determineColumnSize('2');
      const assert4 = determineColumnSize('3');
      const assert5 = determineColumnSize('4');

      expect(assert1).toBe('w-full');
      expect(assert2).toBe('w-full');
      expect(assert3).toBe('w-full md:w-1/3');
      expect(assert4).toBe('w-full md:w-1/2');
      expect(assert5).toBe('w-full md:w-2/3');
    });
  });

  describe('fieldIsHeading', () => {
    it('returns true if the type passed in is a heading', () => {
      const assert1 = fieldIsHeading({ type: 'input' });
      const assert2 = fieldIsHeading({ type: 'heading' });
      const assert3 = fieldIsHeading({ type: 'Heading' });

      expect(assert1).toBe(false);
      expect(assert2).toBe(true);
      expect(assert3).toBe(true);
    });
  });

  describe('fieldValidation', () => {
    const { isRequired, matchingEmails, regexPattern } = fieldValidation;

    it('isRequired - returns the correct boolean/string if field is required ', () => {
      const data = {
        customValidationErrorMsg: '',
        id: 'name',
        items: [],
        label: 'label',
        maxLength: 10,
        minLength: 0,
        name: 'name',
        placeholder: 'placeholder text',
        required: true,
        tabs: [],
        title: 'title',
        toolTipText: '',
        defaultValue: '',
      };
      const assert1 = isRequired(data);
      const assert2 = isRequired({ ...data, customValidationErrorMsg: 'this is an error' });
      const assert3 = isRequired({
        ...data,
        required: false,
        customValidationErrorMsg: 'this is an error',
      });

      expect(assert1).toEqual(true);
      expect(assert2).toEqual('this is an error');
      expect(assert3).toEqual(false);
    });

    it('matchingEmails - returns the correct boolean/string if email values match', () => {
      const emailValueObj = {
        Email: 'email@email.com',
        emailconf: 'email2@email.com',
      };

      const assert1 = matchingEmails('email2@email.com', emailValueObj);
      const assert2 = matchingEmails('email@email.com', {
        ...emailValueObj,
        emailconf: 'email@email.com',
      });
      const assert3 = matchingEmails('Ferret', emailValueObj);

      expect(assert1).toEqual('The email confirmation must match the email.');
      expect(assert2).toEqual(true);
      expect(assert3).toEqual('The email confirmation must match the email.');
    });

    it('regexPattern - returns the validationPattern object or undefined if it doesnt exist', () => {
      const validations = {
        shouldConfirm: true,
        validationPattern: {
          message: 'Can only be numbers',
          value: /^\d+$/,
        },
      };

      const assert1 = regexPattern(validations);
      // @ts-ignore
      // eslint-disable-next-line no-undefined
      const assert2 = regexPattern({ ...validations, validationPattern: undefined });

      expect(assert1).toEqual(validations.validationPattern);
      expect(assert2).toBeUndefined();
    });
  });

  describe('getCurrentFieldNames', () => {
    it('returns an array of field names from an array of createdFields objects', () => {
      const createdFields = [
        {
          Component: () => null,
          data: {
            customValidationErrorMsg: 'Please enter a value.',
            id: 'textinput',
            items: [],
            label: 'Text Input',
            maxLength: 524288,
            minLength: 0,
            name: 'textinput',
            placeholder: '',
            required: false,
            tabs: [],
            title: 'Text Input',
            toolTipText: '',
            defaultValue: '',
          },
          file: 'Input',
          formName: 'stepOne',
          id: 'ky1oawwk7jawtpgsmll4qade5vv8n291',
          props: {
            columns: '6',
            type: 'text',
          },
          validations: {
            shouldConfirm: true,
          },
        },
        {
          Component: () => null,
          data: {
            customValidationErrorMsg: 'Please enter a valid email.',
            id: 'email',
            items: [],
            label: 'Email',
            maxLength: 524288,
            minLength: 0,
            name: 'email',
            placeholder: '',
            required: true,
            tabs: [],
            title: 'Email',
            toolTipText: '',
            defaultValue: '',
          },
          file: 'Input',
          formName: 'stepOne',
          id: 'y32l7xa5o0m0cpxkyb7e2zv0hlidum0l',
          props: {
            columns: '',
            type: 'email',
            icon: 'email',
          },
          validations: {
            shouldConfirm: true,
            validationPattern: {
              message: 'Not a valid email format',
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            },
          },
        },
        {
          Component: () => null,
          data: {
            customValidationErrorMsg: 'The email confirmation must match the email.',
            id: 'emailconf_predef',
            items: [],
            label: 'Confirm Email',
            maxLength: 524288,
            minLength: 0,
            name: 'emailconf_predef',
            placeholder: '',
            required: true,
            tabs: [],
            title: 'Email Confirmation',
            toolTipText: '',
            defaultValue: '',
          },
          file: 'Input',
          formName: 'stepOne',
          id: 'z08dcyasw69diifta5df5yi87oaeo2co',
          props: {
            columns: '',
            confirmEmailFieldName: 'email',
            type: 'email',
            icon: 'email',
          },
          validations: {
            shouldConfirm: true,
            validationPattern: {
              message: 'Not a valid email format',
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            },
          },
        },
      ];

      const assert = getCurrentFieldNames(createdFields);
      expect(assert).toStrictEqual(['textinput', 'email', 'emailconf_predef']);
    });
  });

  describe('isLiteralObject', () => {
    it('returns true if the argument is an object', () => {
      const assert1 = isLiteralObject(null);
      const assert2 = isLiteralObject([]);
      const assert3 = isLiteralObject({});
      const assert4 = isLiteralObject({ test: 'value' });
      const assert5 = isLiteralObject('hello');

      expect(assert1).toEqual(false);
      expect(assert2).toEqual(false);
      expect(assert3).toEqual(true);
      expect(assert4).toEqual(true);
      expect(assert5).toEqual(false);
    });
  });

  describe('masks', () => {
    it('formats phone numbers correctly', () => {
      // Full formatted phone number
      const assert1 = masks.tel('7041002020');
      // As-you-type partially formatted phone numbers
      const assert2 = masks.tel('704100');
      const assert3 = masks.tel('70');

      expect(assert1).toBe('(704) 100-2020');
      expect(assert2).toBe('(704) 100');
      expect(assert3).toBe('(70');
    });

    it('formats ssn numbers correctly', () => {
      // Full formatted ssn number
      const assert1 = masks.ssn('001232020');
      // As-you-type partially formatted ssn numbers
      const assert2 = masks.ssn('00123');
      const assert3 = masks.ssn('001');

      expect(assert1).toBe('001-23-2020');
      expect(assert2).toBe('001-23');
      expect(assert3).toBe('001');
    });

    it('formats dob in MM/DD/YYYY correctly', () => {
      // Full formatted dob
      const assert1 = masks.dob('06071989');
      // As-you-type partially formatted dob
      const assert2 = masks.dob('06/7/1');
      const assert3 = masks.dob('6/7/1');

      expect(assert1).toBe('06/07/1989');
      expect(assert2).toBe('06/07/1');
      expect(assert3).toBe('06/07/1');
    });

    it('only allows numbers', () => {
      const assert1 = masks.numbers('123');
      const assert2 = masks.numbers('123abc');
      const assert3 = masks.numbers('123abc456efg');

      expect(assert1).toBe('123');
      expect(assert2).toBe('123');
      expect(assert3).toBe('123456');
    });
  });
});
/* eslint-enable max-lines */

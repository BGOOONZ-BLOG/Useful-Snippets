/* eslint-disable no-useless-escape */
import { masks } from './utils/forms';
import { CFMappingType } from './types';

const inputMap: CFMappingType['inputMap'] = {
  alternatephone: 'phone',
  'alternate_phone_#': 'phone',
  // TODO: change to 'recaptcha' when its set up,
  captcha: null,
  checkbox: 'checkbox',
  checkbox_list: 'checkboxGroup',
  checkbox_list_progressive: 'checkboxProgressive',
  comments: 'textarea',
  date_of_birth: 'date',
  datepicker: 'date',
  date_picker: 'date',
  drop_list: 'select',
  drop_list_tooltip: 'select',
  email: 'email',
  email_confirmation: 'email',
  form_name: null,
  mobile: 'phone',
  multistepstepsbegin: null,
  multistepstepsend: 'stepend',
  multisteptabs: 'step',
  number: null,
  phone: 'phone',
  pill_toggle: 'pillToggle',
  'preferred_phone_#': 'phone',
  radio_list: 'radio',
  radio_list_progressive: 'radioProgressive',
  rich_text: 'richText',
  section_header: 'heading',
  service_territory: 'select',
  social_security_number: 'ssn',
};

const dataMap: CFMappingType['dataMap'] = {
  checkbox: {
    file: 'Checkbox',
    props: { validationType: 'boolean' },
  },
  checkboxGroup: {
    file: 'Checkbox',
  },
  checkboxProgressive: {
    file: 'CheckboxProgressive',
  },
  date: {
    file: 'DatePicker',
    props: {
      mask: masks.dob,
      maxlength: 10,
      regex: 'date',
      type: 'datePicker',
    },
  },
  email: {
    file: 'Input',
    props: { icon: 'email', regex: 'email', type: 'email' },
  },
  heading: {
    file: 'Heading',
    props: { type: 'heading' },
  },
  hidden: {
    file: 'Input',
    props: { type: 'hidden' },
  },
  input: {
    file: 'Input',
    props: { type: 'text' },
  },
  phone: {
    file: 'Input',
    props: {
      type: 'tel',
      icon: 'phone',
      mask: masks.tel,
      // (xxx)_xxx-xxxx
      maxlength: 14,
      regex: 'phone',
    },
  },
  // 'Pill Toggle' fields will have First and Second Option Text props
  // we need to just convert these to a 'radio' type as their values
  // will always be 'yes/no'
  pillToggle: {
    file: 'RadioGroup',
    props: {
      isPillToggleField: true,
    },
  },
  radio: {
    file: 'RadioGroup',
  },
  radioProgressive: {
    file: 'RadioGroupProgressive',
  },
  recaptcha: {
    file: 'Recaptcha',
  },
  richText: {
    file: 'RichText',
  },
  select: {
    file: 'Select',
  },
  ssn: {
    file: 'Input',
    props: {
      type: 'text',
      mask: masks.ssn,
      // xxx-xx-xxxx
      maxlength: 11,
      regex: 'ssn',
    },
  },
  step: {
    file: 'Start',
  },
  stepend: {
    file: 'End',
  },
  textarea: {
    file: 'Textarea',
  },
};

const regexMap: CFMappingType['regexMap'] = {
  date: {
    message: 'Not a valid date',
    // MM/DD/YYYY
    // valid month/day combination between 1900 and 2099
    value: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/,
  },
  email: {
    message: 'Not a valid email format',
    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  },
  lettersWhiteSpace: {
    message: 'Can only be letters and spaces',
    value: /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\-]+(\s+[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]+)*$/,
  },
  notSameDigits: {
    message: 'Can only contain numbers',
    value: /^(\d)\d*(?!\1)\d+$/,
  },
  onlyNumbers: {
    message: 'Can only be numbers',
    value: /^\d+$/,
  },
  phone: {
    message: 'Not a valid phone number format',
    // (XXX) XXX-XXXX
    value: /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/,
  },
  ssn: {
    message: 'Not a valid Social Security number',
    // XXX-XX-XXXX
    // The first part should have 3 digits and should not be 000, 666, or between 900 and 999.
    // The second part should have 2 digits and it should be from 01 to 99.
    // The third part should have 4 digits and it should be from 0001 to 9999.
    value: /^(?!000)(?!666)(?!9)\d{3}([- ]?)(?!00)\d{2}\1(?!0000)\d{4}$/,
  },
};

export { dataMap, inputMap, regexMap };

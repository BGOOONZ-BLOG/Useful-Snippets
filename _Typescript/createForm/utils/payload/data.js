/* eslint-disable */
const data = {
  textinput: 'dummy info',
  email: 'a@a.com',
  emailconf_predef: 'a@a.com',
  GroupNameRdoProgressive: {
    text: 'Prog One',
    value: 'AddressProg',
  },
  mailingaddress: '123 Sesame Street',
  mailingcity: 'Beverly Hills',
  MailingState: {
    text: 'California',
    value: 'CA',
  },
  mailingzip: '90210',
  someinput: 'random input stuff',
  GroupNameChkProgressive: {
    'Prog One': {
      id: 'Prog One',
      label: 'Prog One',
      value: 'SimpleProg',
    },
    'Another Prog': {
      id: 'Another Prog',
      label: 'Another Prog',
      value: 'AddressProg',
    },
  },
  comments: 'these are my comments',
};

const progressiveState = {
  GroupNameRdoProgressive: {
    fields: [
      {
        id: 'mailingaddress',
        label: 'Mailing Address',
        name: 'mailingaddress',
        form: {
          id: 'Prog One',
          form: 'AddressProg',
          value: 'Prog1',
          label: 'GroupNameRdoProgressive',
        },
      },
      {
        id: 'mailingcity',
        label: 'City',
        name: 'mailingcity',
        form: {
          id: 'Prog One',
          form: 'AddressProg',
          value: 'Prog1',
          label: 'GroupNameRdoProgressive',
        },
      },
      {
        id: 'MailingState',
        label: 'Mailing State',
        name: 'MailingState',
        form: {
          id: 'Prog One',
          form: 'AddressProg',
          value: 'Prog1',
          label: 'GroupNameRdoProgressive',
        },
      },
      {
        id: 'mailingzip',
        label: 'Zip',
        name: 'mailingzip',
        form: {
          id: 'Prog One',
          form: 'AddressProg',
          value: 'Prog1',
          label: 'GroupNameRdoProgressive',
        },
      },
      {
        id: 'someinput',
        label: 'Enter Something',
        name: 'someinput',
        form: {
          id: 'Prog Two',
          form: 'SimpleProg',
          value: 'Prog2',
          label: 'GroupNameRdoProgressive',
        },
      },
      {
        id: 'comments',
        label: 'Comments',
        name: 'comments',
        form: {
          id: 'Prog Two',
          form: 'SimpleProg',
          value: 'Prog2',
          label: 'GroupNameRdoProgressive',
        },
      },
    ],
    type: 'radio',
  },
  GroupNameChkProgressive: {
    fields: [
      {
        id: 'someinput',
        label: 'Enter Something',
        name: 'someinput',
        form: {
          id: 'Prog One',
          form: 'SimpleProg',
          value: 'FirstProg',
          label: 'GroupNameChkProgressive',
        },
      },
      {
        id: 'comments',
        label: 'Comments',
        name: 'comments',
        form: {
          id: 'Prog One',
          form: 'SimpleProg',
          value: 'FirstProg',
          label: 'GroupNameChkProgressive',
        },
      },
      {
        id: 'mailingaddress',
        label: 'Mailing Address',
        name: 'mailingaddress',
        form: {
          id: 'Another Prog',
          form: 'AddressProg',
          value: 'AnProg',
          label: 'GroupNameChkProgressive',
        },
      },
      {
        id: 'mailingcity',
        label: 'City',
        name: 'mailingcity',
        form: {
          id: 'Another Prog',
          form: 'AddressProg',
          value: 'AnProg',
          label: 'GroupNameChkProgressive',
        },
      },
      {
        id: 'MailingState',
        label: 'Mailing State',
        name: 'MailingState',
        form: {
          id: 'Another Prog',
          form: 'AddressProg',
          value: 'AnProg',
          label: 'GroupNameChkProgressive',
        },
      },
      {
        id: 'mailingzip',
        label: 'Zip',
        name: 'mailingzip',
        form: {
          id: 'Another Prog',
          form: 'AddressProg',
          value: 'AnProg',
          label: 'GroupNameChkProgressive',
        },
      },
    ],
    type: 'checkbox',
  },
};

const formattedProgressiveFields = {
  GroupNameChkProgressive: {
    ProgOne: [
      {
        disclosed: {
          comments: { id: 'comments', label: 'Comments', value: 'these are my comments' },
          someinput: { id: 'someinput', label: 'Enter Something', value: 'random input stuff' },
        },
        form: 'SimpleProg',
        id: 'Prog One',
        label: 'GroupNameChkProgressive',
        value: 'FirstProg',
      },
    ],
    AnotherProg: [
      {
        disclosed: {
          MailingState: {
            id: 'MailingState',
            label: 'Mailing State',
            value: { text: 'California', value: 'CA' },
          },
          mailingaddress: {
            id: 'mailingaddress',
            label: 'Mailing Address',
            value: '123 Sesame Street',
          },
          mailingcity: { id: 'mailingcity', label: 'City', value: 'Beverly Hills' },
          mailingzip: { id: 'mailingzip', label: 'Zip', value: '90210' },
        },
        form: 'AddressProg',
        id: 'Another Prog',
        label: 'GroupNameChkProgressive',
        value: 'AnProg',
      },
    ],
  },
  GroupNameRdoProgressive: {
    id: 'Prog One',
    form: 'AddressProg',
    value: 'Prog1',
    label: 'GroupNameRdoProgressive',
    disclosed: {
      MailingState: {
        id: 'MailingState',
        label: 'Mailing State',
        value: { text: 'California', value: 'CA' },
      },
      mailingaddress: {
        id: 'mailingaddress',
        label: 'Mailing Address',
        value: '123 Sesame Street',
      },
      mailingcity: { id: 'mailingcity', label: 'City', value: 'Beverly Hills' },
      mailingzip: { id: 'mailingzip', label: 'Zip', value: '90210' },
    },
  },
  emailconf_predef: 'a@a.com',
  email: 'a@a.com',
  textinput: 'dummy info',
};

export { data, formattedProgressiveFields, progressiveState };
/* eslint-enable */

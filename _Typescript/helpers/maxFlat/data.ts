const data = {
  id: '94a6c786-72d5-4539-b4a0-06dc349037bb',
  name: 'Home',
  displayName: 'Home',
  fields: {
    Page: {
      value: {
        href: '/home',
        text: 'Home',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: '',
        target: '',
        querystring: '',
        id: '{24F2C6FC-D08F-4450-AAB0-D9173DECB52B}',
      },
    },
    'Show In Secondary Nav': {
      value: true,
    },
    Jurisdictions: [],
    'Root Segment': {
      value: '',
    },
    'Home or Business Detection': {
      value: false,
    },
    items: [
      {
        id: '6dafab30-75f2-445f-88d6-346c6f1b90cd',
        name: 'My Account',
        displayName: 'My Account',
        fields: {
          Page: {
            value: {
              href: 'https://jsstest-auth.duke-energy.com:443/my-account',
              text: 'My Account',
              anchor: '',
              linktype: 'internal',
              class: '',
              title: '',
              target: '',
              querystring: '',
              id: '{2C3915A1-A225-4A5A-B0D5-E5D5E8715983}',
            },
          },
          'Show In Secondary Nav': {
            value: true,
          },
          Jurisdictions: [],
          'Root Segment': {
            value: '',
          },
          'Home or Business Detection': {
            value: false,
          },
          items: [
            {
              id: 'aa48758a-bbae-420b-8ddf-6bdac65cf1bc',
              name: 'NC01 Specific Item',
              displayName: 'NC01 Specific Item',
              fields: {
                Page: {
                  value: {
                    href: '/foo',
                    text: 'Foo',
                  },
                },
                'Show In Secondary Nav': {
                  value: true,
                },
                Jurisdictions: [{ fields: { code: { value: 'NC01' } } }],
                'Root Segment': {
                  value: '',
                },
                'Home or Business Detection': {
                  value: false,
                },
              },
            },
            {
              id: '4fa139e6-0079-4259-baa9-1c752ef14f3c',
              name: 'Generic Item',
              displayName: 'Generic Item',
              fields: {
                Page: {
                  value: {
                    href: '/bar',
                    text: 'Bar',
                  },
                },
                'Show In Secondary Nav': {
                  value: true,
                },
                Jurisdictions: [],
                'Root Segment': {
                  value: '',
                },
                'Home or Business Detection': {
                  value: false,
                },
              },
            },
          ],
        },
      },
    ],
  },
};

export default data;

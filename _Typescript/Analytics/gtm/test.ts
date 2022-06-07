import track from './index';
jest.mock('react-gtm-module', () => {
  return {
    dataLayer: (v: any) => v,
  };
});

describe('track', () => {
  it('calls the default method to pass any format of object to the datalayer', () => {
    expect(
      track({
        cat: 'Garfield',
        person: 'Jon Arbuckle',
        author: 'Jim Davis',
      })
    ).toStrictEqual({
      dataLayer: {
        cat: 'Garfield',
        person: 'Jon Arbuckle',
        author: 'Jim Davis',
      },
    });
  });

  it('formats the payload correctly', () => {
    expect(
      track.component({
        action: 'the link click!',
        category: 'Component Name',
        guid: '{300-300}',
      })
    ).toStrictEqual({
      dataLayer: {
        'event-action': 'the-link-click',
        'event-category': 'component_name',
        'event-label': '(not-set)',
        guid: '300-300',
        event: 'event-click',
      },
    });
  });

  it('formats the payload correctly 2', () => {
    expect(
      track.component({
        action: 'the link click!',
        category: 'wHat Is thiS?',
        label: 'Products & Services | Protection Plans & Warranties | Surge Protection',
        guid: '{123456789}',
      })
    ).toStrictEqual({
      dataLayer: {
        'event-action': 'the-link-click',
        'event-category': 'what_is_this',
        'event-label': 'products-services-|-protection-plans-warranties-|-surge-protection',
        guid: '123456789',
        event: 'event-click',
      },
    });
  });
});

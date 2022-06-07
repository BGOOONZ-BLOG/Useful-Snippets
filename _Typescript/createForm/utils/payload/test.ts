import { getPayloadFields } from './index';
import { data, formattedProgressiveFields, progressiveState } from './data';

describe('getPayloadFields', () => {
  it('formats the data and progressiveState in a way that Sitecore expects', () => {
    const assert = getPayloadFields(data, progressiveState);
    expect(assert).toStrictEqual(formattedProgressiveFields);
  });

  it('passes through data if progressiveState is empty', () => {
    const assert = getPayloadFields(data, {});
    expect(assert).toStrictEqual(data);
  });
});

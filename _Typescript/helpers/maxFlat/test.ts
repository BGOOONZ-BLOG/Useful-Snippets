import { maxFlat } from './index';
import data from './data';

describe('maxFlat', () => {
  it('does not include items that do not match the jurisdiction', () => {
    data.fields.items[0].fields.items[0].fields.Jurisdictions[0].fields.code.value = 'NC01';

    // No jurisdiction selected
    const [case1] = maxFlat(3)(data.fields.items);
    expect(case1.subpages.length).toBe(1);

    // Selected Jurisdiction is a match
    const [case2] = maxFlat(3, { selectedJurisdiction: 'NC01' })(data.fields.items);
    expect(case2.subpages.length).toBe(2);

    // Selected Jurisdiction is NOT a match
    const [case3] = maxFlat(3, { selectedJurisdiction: 'FL01' })(data.fields.items);
    expect(case3.subpages.length).toBe(1);
  });
});

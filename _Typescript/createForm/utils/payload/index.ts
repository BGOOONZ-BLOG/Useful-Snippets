import { onlyUniqueWords, toPascalCase } from 'src/lib/helpers';
import { isLiteralObject } from '../forms';
import { BuildPayloadFieldsType, GetPayloadFieldsTypes } from './types';

const buildPayloadFields: BuildPayloadFieldsType = (state, data, condition) => {
  let selectedForm = { id: '', form: '', value: '' };
  const disclosed = state.fields.reduce((acc, { id, form, label, name }) => {
    if (form.id === condition) {
      selectedForm = form;
      return { [name]: { id, label, value: data[name] }, ...acc };
    } else {
      return acc;
    }
  }, {});
  return { disclosed, form: selectedForm };
};

const getPayloadFields: GetPayloadFieldsTypes = (data, progressiveState) => {
  if (!progressiveState) return data;

  const progressiveFieldsPayloadArr: Array<any> = [];
  const progressiveFieldsToExcludeFromPayload = onlyUniqueWords(
    Object.values(progressiveState)
      .map(elm => elm.fields)
      .flat()
      .map(elm => elm.id)
      .join(' ')
  ).split(' ');

  // all fields in the incoming data payload
  Object.keys(data).forEach(dataField => {
    const stateField = progressiveState[dataField];

    // if current field is a progressive field
    if (stateField && data[dataField]) {
      switch (stateField.type) {
        case 'radio': {
          const optionSelected = data[dataField].text;
          const { disclosed, form } = buildPayloadFields(stateField, data, optionSelected);

          return progressiveFieldsPayloadArr.push({
            [dataField]: {
              ...form,
              disclosed,
            },
          });
        }
        case 'checkbox': {
          const checkboxFieldsArr: Array<any> = [];
          const optionSelected = Object.keys(data[dataField]);

          optionSelected.forEach(elm => {
            const { disclosed, form } = buildPayloadFields(stateField, data, elm);

            checkboxFieldsArr.push({
              [toPascalCase(elm)]: [
                {
                  ...form,
                  disclosed,
                },
              ],
            });
          });

          const checkboxFieldsObj = checkboxFieldsArr.reduce(
            (acc, curr) => ({ ...acc, ...curr }),
            {}
          );

          return progressiveFieldsPayloadArr.push({
            [dataField]: checkboxFieldsObj,
          });
        }
        default: {
          return progressiveFieldsPayloadArr.push(dataField);
        }
      }
    } else {
      return progressiveFieldsPayloadArr.push(dataField);
    }
  });

  // remove 'normal' fields that are already 'disclosed' in the progressive fields and set the data
  return progressiveFieldsPayloadArr
    .filter(elm => elm && !progressiveFieldsToExcludeFromPayload.includes(elm))
    .map(elm => {
      if (isLiteralObject(elm)) {
        return elm;
      } else {
        return { [elm]: data[elm] };
      }
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

export { getPayloadFields };

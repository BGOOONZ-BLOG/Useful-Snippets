import { PFState, PFStateValue } from 'src/components/Form/Progressive/context/types';

interface BuildPayloadFieldsType {
  (state: PFStateValue, data: { [x: string]: any }, condition: string): {
    disclosed: { [x: string]: { id: string; label: string; value: string } };
    form: { id: string; form: string; value: string };
  };
}

interface GetPayloadFieldsTypes {
  (data: { [x: string]: any }, progressiveState: PFState): object;
}

export type { BuildPayloadFieldsType, GetPayloadFieldsTypes };

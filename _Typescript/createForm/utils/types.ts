import { PFState } from "src/components/Form/Progressive/context/types";

interface BuildPayload {
  data: any;
  dataSource: string;
  formName: string;
  progressiveState: PFState;
  token: string;
  salesforce?: { action: boolean; fields: object };
}

export type { BuildPayload };

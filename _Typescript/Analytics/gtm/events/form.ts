import track, { cleanData, pushData } from "src/lib/Analytics/gtm";
import { FormEvent, VpvData } from "src/lib/Analytics/gtm/types";

const sendVpv = (vpv: string) => {
  pushData({
    event: "send-VPV",
    "vpv-name": vpv,
  });
};

const vpvStringBuilder = ({
  pageTitle,
  stepIndex,
  stepName,
  guid,
}: VpvData) => {
  return `/vpv/form-builder/multiple-step/${[
    pageTitle,
    stepIndex,
    stepName,
    guid,
  ]
    // Can't just use Boolean because we need to send '0' when the stepIndex is 0
    .filter((d: any) => d || d === 0 || false)
    .map((item) => cleanData(`${item}`))
    .join("/")}`;
};

const trackForm = {
  multiFormError: ({
    errorMessage,
    formName,
    heading,
    stepName,
    stepIndex,
    guid,
    returnCode,
    pageTitle,
  }: Required<Pick<FormEvent, "errorMessage">> &
    FormEvent & { stepIndex: number; pageTitle: string }) => {
    const data = {
      category: "error_form_multiple-step",
      label: [formName, stepIndex, heading, stepName]
        .filter(Boolean)
        .map((item) => cleanData(`${item}`))
        .join("-|-"),
      action: errorMessage,
      guid,
    };
    const vpv = `${vpvStringBuilder({
      guid,
      pageTitle,
      stepIndex,
      stepName,
    })}/error${returnCode ? `/${returnCode}` : ""}`;

    sendVpv(vpv);
    track.component(data);
  },

  multiFormLoad: ({
    pageTitle,
    stepIndex,
    stepName,
    guid,
  }: FormEvent & { stepIndex: number; pageTitle: string }) => {
    const data = {
      category: "form_multiple-step",
      label: pageTitle,
      action: "form-load",
      guid,
    };
    const vpv = `${vpvStringBuilder({
      guid,
      pageTitle,
      stepIndex,
      stepName,
    })}/intent`;

    sendVpv(vpv);
    track.component(data);
  },

  multiFormContinue: ({
    guid,
    pageTitle,
    stepIndex,
    stepName,
  }: FormEvent & { stepIndex: number; pageTitle: string }) => {
    const vpv = `${vpvStringBuilder({
      guid,
      pageTitle,
      stepIndex,
      stepName,
    })}/tab-load`;

    // No analytics event, as per spreadsheet
    sendVpv(vpv);
  },

  multiFormSubmission: ({
    guid,
    pageTitle,
    stepName,
  }: FormEvent & { stepIndex: number; pageTitle: string }) => {
    const vpv = `${vpvStringBuilder({
      guid,
      pageTitle,
      stepName,
    })}/completion`;

    sendVpv(vpv);
    track.component({
      category: "form_multiple-step",
      label: pageTitle,
      action: "successful-submission",
      guid,
    });
  },

  singleForm: ({ formName, guid }: FormEvent) => {
    const sendVpv = (name: string) =>
      pushData({
        event: "send-VPV",
        "vpv-name": `/vpv/form-builder/single-step/${cleanData(
          formName
        )}/${cleanData(guid)}/${name}`,
      });

    return {
      error: () => {
        sendVpv("error");
      },

      load: () => {
        track.component({
          action: "form-load",
          category: "form_single-step",
          event: "event-load",
          label: formName,
          guid,
        });

        sendVpv("intent");
      },

      submit: () => {
        track.component({
          action: "successful-submission",
          category: "form_single-step",
          event: "event-load",
          label: formName,
          guid,
        });

        sendVpv("completion");
      },
    };
  },
};

export { trackForm };

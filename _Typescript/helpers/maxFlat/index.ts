import { ComponentEvent } from "src/lib/Analytics/gtm/types";

type inputItems = {
  fields: {
    Page: { value: { text: string; href: string } };
    items?: inputItems;
    Jurisdictions: { fields: { code: { value: string } } }[];
  };
  name?: string;
}[];

type outputItems = {
  name: string;
  depth: number;
  childRoutes: string[];
  page: { value: { text: string; href: string } } & {
    analytics: ComponentEvent;
  };
  subpages: outputItems;
  position: number[];
}[];

const isNotJurisdictionMatch = (
  jurisdictions: inputItems[0]["fields"]["Jurisdictions"],
  selectedJurisdiction?: string
) => {
  // If we don't know the user's jurisdiction, then we don't know if it matches so
  // we assume that it DOES NOT
  if (!selectedJurisdiction) {
    return true;
  }

  return (
    jurisdictions
      .map((ju) => ju.fields?.code?.value)
      .indexOf(selectedJurisdiction) < 0
  );
};

const maxFlat = (max: number, options?: { selectedJurisdiction?: string }) => {
  return function flatItems(
    items: inputItems = [],
    depth = 0,
    nameArg = "",
    analyticsLabel = "",
    position: number[] = []
  ): outputItems {
    const initial: outputItems = [];
    return items.reduce(
      (
        acc,
        { fields: { Page, items, Jurisdictions }, name = nameArg },
        index
      ) => {
        if (depth < max) {
          // If the user's selected jurisdiction does not match a value in Jurisdictions,
          // then that item should not be included in the tree.
          // Instead we just return the acc values we have already built.
          if (
            Jurisdictions.length &&
            isNotJurisdictionMatch(Jurisdictions, options?.selectedJurisdiction)
          ) {
            return acc;
          }

          // position is accumulated Array of indexes that points to where the curr item
          // occurs within the data structure, eg pos = [0, 1] refers to items[0].subpages[1]
          const pos = position.concat(index);

          const label = [analyticsLabel, Page.value.text]
            .filter(Boolean)
            .join(" | ");
          return [
            ...acc,
            {
              name,
              depth,
              position: pos,
              childRoutes:
                items?.map(({ fields: { Page } }) => Page.value?.href) || [],
              page: {
                ...Page,
                analytics: {
                  category: "hamburger_navigation",
                  label,
                  action: Page?.value?.href,
                  guid: (Page?.value as any)?.id,
                  event: "event-click",
                },
              },
              subpages: flatItems(items, depth + 1, name, label, pos).filter(
                (item) => item.page?.value
              ),
            },
          ];
        }
        return acc;
      },
      initial
    );
  };
};

export { maxFlat, isNotJurisdictionMatch };

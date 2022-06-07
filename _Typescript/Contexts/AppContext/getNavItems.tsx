/* eslint-disable complexity */
import { GetItems, SecondaryNavItems } from "src/components/SecondaryNav/types";
import { getSectionSegment } from "src/lib/helpers";
import { isNotJurisdictionMatch } from "src/lib/helpers/maxFlat";
import Logger from "src/lib/Logger";

export const getNavItems = (
  data?: { fields?: Record<string, any> },
  selectedJurisdiction?: string,
  pathname?: string
) => {
  pathname = pathname?.split(" ").join("-").toLowerCase();
  const fields = data?.fields;
  let sectionHeadline: { route: string; name: string } | undefined;
  let sectionSegment: string | undefined = "/";
  let hasSectionSegment: boolean = false;
  let segmentDetection: boolean = false;

  const getItems: GetItems = (arr, depth, parent, position = []) => {
    if (!arr || depth > 4) return [];

    const navItems: SecondaryNavItems[] = [];

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const name = item.fields?.Page?.value?.text;
      const route = item.fields?.Page?.value?.href;

      // If these are falsey, we skip the item and do not include it
      if (!name || !item.fields?.["Show In Secondary Nav"]?.value) {
        // eslint-disable-next-line no-continue
        continue;
      }

      // If the item is limited to a jurisdiction that doesn't match the selectedJurisdiction
      // then we skip it
      if (
        item.fields.Jurisdictions.length &&
        isNotJurisdictionMatch(item.fields.Jurisdictions, selectedJurisdiction)
      ) {
        // eslint-disable-next-line no-continue
        continue;
      }
      // position is array describing where an item descended from in the tree
      // for example, the route "/home/products" we might have:
      // position = [{route: '/home', name: 'home'}, {route: '/home/products', name: 'products'}]
      const pos = position.concat({ route, name });

      // Check for the Section Page checkbox on the current item
      const sectionPage = item.fields?.["Section Page"]?.value;
      // Check if the current page is configured as a Section Page or is a child of a Section Page
      if (sectionPage && pathname?.startsWith(item.fields?.Page.value.href)) {
        sectionSegment = item.fields?.Page.value.href;
        hasSectionSegment = true;
        // Else check other configurations
      } else {
        // Set default section segment if one has not be set already
        if (!hasSectionSegment) {
          sectionSegment = "/" + pathname?.split("/")[1];
        }
        // Check for Root Segment configuration on the current item
        const rootSegment = item.fields?.["Root Segment"]?.value;
        if (rootSegment && pathname === item.fields?.Page.value.href) {
          sectionSegment = rootSegment;
        }
        // Check for Home or Business Detection
        const homeOrBusinessDetection =
          item.fields?.["Home or Business Detection"]?.value;
        // If it has ['Home or Business Detection'] set to true, then we will need to display SecondaryNav for
        // that item even though the url structure of the item may not match that of the parent.
        // This should override any other SecondaryNav detection / settings
        // For ex: /home-services/heating-and-cooling-repair should have a SecondaryNav based on the DEC cookie segment
        if (
          homeOrBusinessDetection &&
          pathname === item.fields?.Page.value.href
        ) {
          segmentDetection = true;
        }
      }

      const label = parent && depth > 1 ? [parent, name].join(" | ") : name;

      const navItem = {
        position: pos,
        name,
        route,
        subpages: getItems(item.fields?.items, depth + 1, label, pos),
        analytics: {
          category: depth === 1 ? "primary_navigation" : "secondary_navigation",
          label,
          action: route,
          guid: (item.fields?.Page?.value as any)?.id,
          event: "event-click",
        },
      };
      navItems.push(navItem);
    }

    return navItems;
  };

  // Build out the nav, then get the items for the current route
  // We need to build out the full tree of items, before we filter which are relevant bc sectionSegment
  // assignment might occur a nested item
  let items: ReturnType<GetItems>;
  try {
    items = getItems(fields?.items, 0);
    // If home or business detection is enabled for the current nav item, override sectionSegment before filtering
    sectionSegment = segmentDetection
      ? getSectionSegment() === "BUS"
        ? "/business"
        : "/home"
      : sectionSegment;
    // Get segment 1 and 2 to filter at the appropriate level
    const sectionSegment1 = "/" + sectionSegment.split("/")[1];
    const sectionSegment2 = sectionSegment.split("/")[2]
      ? sectionSegment1 + "/" + sectionSegment.split("/")[2]
      : null;
    // Filter initially based on the 1st segment
    items = items.filter((item) => item.route === sectionSegment1);
    // If there is a second segment we filter the subpages
    if (sectionSegment2) {
      items = items[0].subpages.filter(
        (items) => items.route === sectionSegment2
      );
    }
    // if there are nav items sectionHeadline can be pulled from the root nav item after all the filtering
    // when sectionHeadline is returned as undefined, it will fallback to the current page's nav title
    // eslint-disable-next-line no-undefined
    sectionHeadline =
      items.length > 0
        ? { route: items[0].route, name: items[0].name }
        : undefined;
  } catch (error) {
    Logger(error, { message: "Error at getItems in AppContext" });
    items = [];
  }

  return {
    items,
    headline: sectionHeadline,
  };
};

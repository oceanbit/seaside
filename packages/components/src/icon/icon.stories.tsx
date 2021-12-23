import React from "react";
import { Icon } from "./icon";

export default { title: "Seaside Components/Icon" };

const allIcons = [
  "add",
  "arrow_down",
  "arrow_left",
  "arrow_right",
  "arrow_up",
  "back",
  "branch",
  "calendar",
  "cancel",
  "change_addition",
  "change_conflict",
  "change_mixed",
  "change_refactored",
  "change_removal",
  "changes",
  "checkbox_intermediate",
  "checkbox_selected",
  "checkbox_unselected",
  "checkout",
  "checkout_commit",
  "cherry_pick",
  "close",
  "copy",
  "delete",
  "diff",
  "drawer",
  "error",
  "favorite",
  "favorite_selected",
  "fetch",
  "file",
  "folder",
  "fork",
  "forward",
  "github",
  "history",
  "invisible",
  "link",
  "menu",
  "merge",
  "open_in_app",
  "paste",
  "patch",
  "pull",
  "pull_request",
  "push",
  "radio_selected",
  "radio_unselected",
  "rebase",
  "redo",
  "refresh",
  "rename",
  "repository",
  "reset_to_here",
  "revert_commit",
  "settings",
  "squash",
  "staging_sheet",
  "staging_split",
  "stash",
  "tags",
  "tracking",
  "undo",
  "visible",
];

export const AllIcons = () => (
  <ul
    style={{ listStyle: "none", columns: 4 }}
    aria-label={"List of seaside icons"}
  >
    {allIcons.map((iconName) => (
      <li aria-label={"Icon for " + iconName} style={{ padding: "0.5rem" }}>
        <Icon key={iconName} name={iconName!} size={40} />
      </li>
    ))}
  </ul>
);

// If we import from `index`, it causes our bundle to grow by 100kb+!
import createIconSetFromIcoMoon from "react-native-vector-icons/lib/create-icon-set-from-icomoon";
import icomoonConfig from "./selection.json";

export const Icon = createIconSetFromIcoMoon(icomoonConfig, "SeasideIcon");

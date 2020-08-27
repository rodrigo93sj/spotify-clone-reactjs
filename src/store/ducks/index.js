import { combineReducers } from "redux";

import me from "./me";
import categories from "./categories";
import category from "./category";
import releases from "./releases";
import featured from "./featured";
import playlist from "./playlist";
import album from "./album";
import player from "./player";

export default combineReducers({
  me,
  categories,
  category,
  releases,
  featured,
  playlist,
  album,
  player,
});

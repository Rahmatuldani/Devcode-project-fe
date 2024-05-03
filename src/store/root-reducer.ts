import { combineReducers } from "redux";
import { activityReducer } from "./activity/reducer";

const rootReducer = combineReducers({
    activity: activityReducer
})

export default rootReducer
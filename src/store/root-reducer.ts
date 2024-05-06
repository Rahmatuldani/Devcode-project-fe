import { combineReducers } from "redux";
import { activityReducer } from "./activity/reducer";
import { todoReducer } from "./todo/reducer";

const rootReducer = combineReducers({
    activity: activityReducer,
    todo: todoReducer
})

export default rootReducer
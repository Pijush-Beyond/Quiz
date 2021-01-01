import { combineReducers, createStore } from "redux";
import Mode from "../Component/Reducers/Mode";
import QuestionsReducer from "../Component/Reducers/QuestionsReducer";
import ResultReducer from "../Component/Reducers/ResultReducer";
import UserNameReducer from "../Component/Reducers/UserNameReducer";

const rootReducer = combineReducers({
  userName: UserNameReducer,
  mode: Mode,
  questions: QuestionsReducer,
  result: ResultReducer,
})

export default createStore(rootReducer)
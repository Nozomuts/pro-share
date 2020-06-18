import { combineReducers, createStore } from "redux";
import { userReducer } from './user/reducers';
import { colorReducer } from './color/reducers';


const rootReducer = combineReducers({
  user: userReducer,
  color: colorReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer)

export default store;

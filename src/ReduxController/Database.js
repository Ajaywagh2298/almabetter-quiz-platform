import rootReducer from "./Reducer/IndexReducerScript";
import { createStore } from "redux";

const database = createStore(rootReducer);

export default database;

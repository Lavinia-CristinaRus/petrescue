import Main from "./Main";
import { Provider } from "react-redux";
import {store, persistor} from "./redux/store";
import { LogBox } from 'react-native'

export default function App() {
  LogBox.ignoreAllLogs(true);
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

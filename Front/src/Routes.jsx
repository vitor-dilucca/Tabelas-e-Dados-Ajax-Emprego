import { BrowserRouter, Route } from "react-router-dom";
import Home from "./core/Home";

const Routes = () => {
  return (
    <BrowserRouter>
        <Route path="/" exact component={Home}></Route>
    </BrowserRouter>
  );
};

export default Routes;

import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

// Style reminder: afro-modern convivial with maize, toasted orange and burgundy hierarchy.
export default function App() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/commande" component={Checkout} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

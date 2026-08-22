import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

// Style reminder: afro-modern convivial with maize, toasted orange and burgundy hierarchy.
export default function App() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/commande" component={Checkout} />
    <Route path="/confirmation" component={Confirmation} />
    <Route path="/dashboard" component={Admin} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

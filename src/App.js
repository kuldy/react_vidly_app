import React from "react";
import AdvancedReact from "./advancedReactApp/AdvancedReact";
import ReactAdvanced from "./advancedReactApp/AdvancedReact";

import CounterApp from "./counterApp/CounterApp";
import HttpApp from "./httpApp/HttpApp";
import RoutingApp from "./routingApp/RoutingApp";
import MoviesApp from "./vidly/MoviesApp";

function App() {
  return (
    <>
      <main className="container">
        {/* <CounterApp /> */}
        {/* <MoviesApp /> */}
        {/* <RoutingApp /> */}
        {/* <HttpApp /> */}
        <AdvancedReact />
      </main>
    </>
  );
}

export default App;

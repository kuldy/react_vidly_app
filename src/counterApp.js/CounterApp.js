import React, { useState } from "react";

import Counters from "./Counters";
import NavBar from "./NavBar";

const CounterApp = () => {
  const initialstate = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };
  const [state, setState] = useState(initialstate);

  const handleIncrement = (counter) => {
    const counters = [...state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    setState({ counters });
  };

  const handleDecrement = (counter) => {
    const counters = [...state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value--;
    setState({ counters });
  };

  const handleReset = () => {
    const counters = state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    setState({ counters });
  };

  const handleDelete = (counterId) => {
    const counters = state.counters.filter(
      (counter) => counter.id !== counterId
    );
    setState({ counters });
  };
  return (
    <>
      <NavBar
        totalCounters={state.counters.filter((c) => c.value > 0).length}
      />
      <Counters
        counters={state.counters}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onReset={handleReset}
        onDelete={handleDelete}
      />
    </>
  );
};

export default CounterApp;

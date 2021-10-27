// A red React button component that says "Click Me"
import React, { useEffect } from "react";

const Button = () => {
  // changes the button's color to a random color
  const changeColor = () => {
    const colors = [
      "red",
      "blue",
      "green",
      "yellow",
      "orange",
      "purple",
      "pink",
      "black",
      "white",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById("button").style.backgroundColor = randomColor;
  };

  // adds a click event listener to the button
  const addClickEventListener = () => {
    document.getElementById("button").addEventListener("click", changeColor);
  };

  useEffect(addClickEventListener, []);

  return <button className="btn btn-danger">Click Me</button>;
};

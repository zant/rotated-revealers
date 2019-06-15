import React, { useState } from "react";
import "./base.css";
import introImg from "./assets/1.jpg";
import runes from "runes";
import { animated, useSpring, useTrail } from "react-spring";


function App() {
  const [toggle, set] = useState(true);
  const letters = runes("hello there");
  const config = { mass: 5, tension: 2000, friction: 150 };

  const trail = useTrail(letters.length, {
    config,
    onRest: () => set(true),
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    from: { opacity: 0, x: 20, height: 0 }
  });

  return (
    <main>
      <div className="content content--grid content--second">
        <div className="content content--first">
          <div className="content__move">
            <div className="intro">
              <div
                className="intro__img"
                style={{ backgroundImage: `url(${introImg})` }}
              />
              <h1 className="intro__title">
                {trail.map(({ x, ...rest }, index) => (
                  <animated.span
                    key={index}
                    style={{
                      ...rest,
                      transform: x.interpolate(x => `translate3d(0, ${x}px, 0)`)
                    }}
                  >
                    {letters[index]}
                  </animated.span>
                ))}
              </h1>
              <button
                className="intro__enter"
                onMouseEnter={() => set(state => !state)}
              >
                enter
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;

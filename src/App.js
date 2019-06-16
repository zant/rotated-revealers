import React, { useState } from "react";
import "./base.css";
import introImg from "./assets/1.jpg";
import runes from "runes";
import { animated, useTrail, useSpring } from "react-spring";

function App() {
  const [toggle, setToggle] = useState(false);
  const letters = runes("Привет всем");
  const config = { mass: 5, tension: 2000, friction: 150 };

  const props = useSpring({
    to: {
      transform: toggle ? "translate3d(0,-100%,0)" : "translate3d(0,0,0)"
    },
    from: { transform: "translate3d(0,-100%,0)" }
  });

  const reverseProps = useSpring({
    to: {
      transform: toggle
        ? "translate3d(0,100%,0) rotate3d(0,0,1,-35deg)"
        : "translate3d(0,0,0) rotate3d(0,0,1,-35deg)"
    },
    from: { transform: "translate3d(0,100%,0) rotate3d(0,0,1,-35deg)" }
  });

  const img = useSpring({
    to: {
      opacity: toggle ? 0 : 1,
      transform: toggle
        ? "translateY(-40px) scaleY(1.1)"
        : "translateY(0) scale(1)"
    },
    from: {
      opacity: 1,
      transform: "translateY(-40px) scaleY(1.1)"
    }
  });

  const trail = useTrail(letters.length, {
    config,
    opacity: 1,
    x: 0,
    from: { opacity: 1, x: 0 }
  });

  const boundingBox = (w, h, angle) => [
    w * Math.abs(Math.cos(angle * (Math.PI / 180))) +
      h * Math.abs(Math.sin(angle * (Math.PI / 180))),
    w * Math.abs(Math.sin(angle * (Math.PI / 180))) +
      h * Math.abs(Math.cos(angle * (Math.PI / 180)))
  ];

  const [boundingW, boundingH] = boundingBox(
    window.innerWidth,
    window.innerHeight,
    35
  );

  return (
    <main>
      <div className="content content--grid content--second">
        <h2 className="content__title">второй</h2>
        <button
          className="intro__enter content__leave"
          onClick={() => setToggle(state => !state)}
        >
          leave
        </button>
      </div>
      <animated.div
        style={{ transform: "rotate3d(0,0,1,35deg)" }}
        className={`content content--first ${
          toggle ? "content__hidden" : null
        }`}
      >
        <animated.div
          style={{ ...props, width: boundingW, height: boundingH }}
          className="content__move"
        >
          <animated.div
            style={{ ...reverseProps }}
            className="content__reverse"
          >
            <div className="intro">
              <animated.div
                className="intro__img"
                style={{ ...img, backgroundImage: `url(${introImg})` }}
              />
              <h1 className="intro__title">
                {trail.map(({ x, ...rest }, index) => (
                  <animated.span
                    key={index}
                    style={{
                      ...rest,
                      transform: x.interpolate(
                        x => `translate3d(0, -${x}px, 0)`
                      )
                    }}
                  >
                    {letters[index]}
                  </animated.span>
                ))}
              </h1>
              <button
                className="intro__enter"
                onClick={() => setToggle(state => !state)}
              >
                enter
              </button>
            </div>
          </animated.div>
        </animated.div>
      </animated.div>
    </main>
  );
}

export default App;

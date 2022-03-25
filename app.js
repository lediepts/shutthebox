const rootNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function App() {
  const [state, setState] = React.useState({
    name: "",
    gameStatus: "init",
    num1: 6,
    num2: 6,
  });
  const [run, setRun] = React.useState(0);
  const [items, setItems] = React.useState([
    {
      value: 1,
      status: 0,
    },
    {
      value: 2,
      status: 0,
    },
    {
      value: 3,
      status: 0,
    },
    {
      value: 4,
      status: 0,
    },
    {
      value: 5,
      status: 0,
    },
    {
      value: 6,
      status: 0,
    },
    {
      value: 7,
      status: 0,
    },
    {
      value: 8,
      status: 0,
    },
    {
      value: 9,
      status: 0,
    },
  ]);
  React.useEffect(() => {
    if (items.filter((f) => f.status === 2).length === 9) {
      setState({ ...state, gameStatus: "win" });
    }
  }, [items]);
  const total = React.useMemo(() => {
    return state.num1 + state.num2;
  }, [run]);
  React.useEffect(() => {
    if (run === 2) {
      const l1 = items.filter((f) => f.status === 0);
      const tt = l1.reduce((p, c) => {
        return p + c.value;
      }, 0);
      let isNext = !!l1.find((f) => f.value === total);
      if (l1.find((f) => f.value <= total) && tt > total) {
        for (const item of l1) {
          if (isNext) break;
          const l2 = l1.filter((f) => f.value !== item.value);
          for (const l of l2) {
            if (item.value + l.value === total) {
              isNext = true;
              break;
            } else {
              isNext = false;
            }
          }
        }
      }
      if (isNext) {
        const t = items.map((pre) => ({
          value: pre.value,
          status:
            pre.status === 2
              ? pre.status
              : total && total !== 0 && pre.value > total
                ? 4
                : 0,
        }));
        setItems(t);
      } else {
        setState({ ...state, gameStatus: "lost" });
      }
    }
  }, [total, run]);

  const handleSelectCard = (i) => {
    if (i < total) {
      const s = items.find((f) => f.value === i);
      let t = null;
      if (s && s.status === 1) {
        t = items.map((pre) => ({
          value: pre.value,
          status:
            total - s.value < 0
              ? 4
              : pre.value === s.value
                ? 0
                : pre.status === 4
                  ? 0
                  : pre.status,
        }));
      } else if (s.status === 0) {
        const tmp = items.find((f) => f.status === 1);
        if (tmp) {
          if (tmp.value + s.value === total) {
            t = items.map((pre) => ({
              value: pre.value,
              status:
                pre.value === tmp.value || pre.value === s.value
                  ? 2
                  : pre.status === 4
                    ? 0
                    : pre.status,
            }));
            setRun(0);
          }
        } else {
          const k = items.find(
            (f) => f.value === total - s.value && f.status === 0
          );
          if (k) {
            t = items.map((pre) => ({
              value: pre.value,
              status:
                pre.value === s.value
                  ? 1
                  : k.value === pre.value
                    ? 0
                    : pre.status === 0
                      ? 4
                      : pre.status,
            }));
          } else {
            t = [...items];
          }
        }
      }
      t && setItems(t);
    } else if (i === total) {
      const t = items.map((pre) => ({
        value: pre.value,
        status: pre.value === i ? 2 : pre.status === 4 ? 0 : pre.status,
      }));
      setItems(t);
      setRun(0);
    }
  };
  const restart = () => {
    setState({
      ...state,
      gameStatus: "start",
      num1: 6,
      num2: 6,
    });
    setItems([
      {
        value: 1,
        status: 0,
      },
      {
        value: 2,
        status: 0,
      },
      {
        value: 3,
        status: 0,
      },
      {
        value: 4,
        status: 0,
      },
      {
        value: 5,
        status: 0,
      },
      {
        value: 6,
        status: 0,
      },
      {
        value: 7,
        status: 0,
      },
      {
        value: 8,
        status: 0,
      },
      {
        value: 9,
        status: 0,
      },
    ]);
    setRun(0);
  };
  if (state.gameStatus === "init") {
    return (
      <div className="container">
        <div className="inputForm">
          <div className="input">
            <label htmlFor="name" className="">
              お名前
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className=""
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          </div>
          <div className="action">
            <button
              className=""
              disabled={!state.name}
              onClick={() => setState({ ...state, gameStatus: "start" })}
            >
              Let's Go!!
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (state.gameStatus !== "init") {
    return (
      <div className="container">
        {state.gameStatus === "lost" && (
          <div className="lost">
            <h1 className="">YOU LOST!!</h1>
            <div>
              <button
                className=""
                onClick={() => restart()}
              >
                re-start
              </button>
            </div>
          </div>
        )}
        {state.gameStatus === "win" && (
          <div className="win">
            <h1 className="">YOU WIN!!</h1>
            <div>
              <button
                className=""
                onClick={() => restart()}
              >
                re-start
              </button>
            </div>
          </div>
        )}
        <h1>{state.name}</h1>
        <div className="main">
          <div
            className="selectBar"
            style={{
              pointerEvents: run === 2 ? "auto" : "none",
              opacity: run === 2 ? "1" : "0.5",
            }}
          >
            {items.map((v, i) => {
              return (
                <div
                  key={v.value}
                  className={`selectBar__card ${v.status === 2 ? "selected" : ""
                    } ${v.status === 1 ? "last" : ""} ${v.status === 4 ? "over" : ""
                    }`}
                  onClick={() => handleSelectCard(v.value)}
                >
                  <span className="font-effect-3d">{v.value}</span>
                </div>
              );
            })}
          </div>
          <div className="random">
            <div className="random__box">
              <span
                className={` ${run === 1 ? "round" : run === 2 ? "end" : ""
                  }`}
              >
                {state.num1}
              </span>
            </div>
            <div className="random__box">
              <span
                className={` ${run === 1 ? "round" : run === 2 ? "end" : ""
                  }`}
              >
                {state.num2}
              </span>
            </div>
          </div>
          <button
            disabled={run !== 0}
            className="roll"
            onClick={() => {
              setRun(1);
              setTimeout(() => {
                setState({
                  ...state,
                  num1: Math.ceil(Math.random() * 6),
                  num2: Math.ceil(Math.random() * 6),
                });
                setRun(2);
              }, 200);
            }}
          >
            ROLL
          </button>
        </div>
      </div>
    );
  }
  return null;
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));

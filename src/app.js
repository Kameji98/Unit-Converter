function formatNumber(n) {
  if (!Number.isFinite(n)) return "—";
  const asInt = Math.abs(n - Math.round(n)) < 1e-12;
  return asInt ? String(Math.round(n)) : n.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
}

function convert(mode, value) {
  switch (mode) {
    case "km-mi":
      return { out: value * 0.621371, label: "miles", formula: "miles = km × 0.621371" };
    case "mi-km":
      return { out: value / 0.621371, label: "km", formula: "km = miles ÷ 0.621371" };
    case "c-f":
      return { out: value * 9/5 + 32, label: "°F", formula: "°F = (°C × 9/5) + 32" };
    case "f-c":
      return { out: (value - 32) * 5/9, label: "°C", formula: "°C = (°F − 32) × 5/9" };
    default:
      return { out: NaN, label: "", formula: "" };
  }
}

function main() {
  const modeEl = document.getElementById("mode");
  const inputEl = document.getElementById("inputValue");
  const btn = document.getElementById("convertBtn");
  const resultEl = document.getElementById("result");
  const formulaEl = document.getElementById("formula");

  function run() {
    const raw = inputEl.value;
    if (raw === "") {
      resultEl.textContent = "—";
      formulaEl.textContent = "";
      return;
    }

    const value = Number(raw);
    if (!Number.isFinite(value)) {
      resultEl.textContent = "Invalid input";
      formulaEl.textContent = "";
      return;
    }

    const r = convert(modeEl.value, value);
    resultEl.textContent = `${formatNumber(r.out)} ${r.label}`;
    formulaEl.textContent = r.formula;
  }

  btn.addEventListener("click", run);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") run();
  });
  modeEl.addEventListener("change", run);

  run();
}

main();

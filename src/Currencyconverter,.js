//Use this as a challenge to apply what  i learnt
import { useEffect, useState } from "react";

export default function Currencyconverter() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [output, setOutput] = useState("");
  const [isLoading, setIsloading] = useState(false);

  useEffect(
    function () {
      async function converter() {
        setIsloading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        setOutput(data.rates[toCur]);
        setIsloading(false);
      }
      if (fromCur === toCur) return setOutput(amount);
      converter();
    },
    [amount, fromCur, toCur]
  );
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      ></input>
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="CAD">CAD</option>
        <option value="NOK">NOK</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="CAD">CAD</option>
        <option value="NOK">NOK</option>
      </select>
      <p className="c">
        {output} {toCur}
      </p>
    </div>
  );
}

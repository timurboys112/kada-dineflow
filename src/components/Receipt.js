import { formatRupiah } from "../utils/formatRupiah";

function Receipt({ items, total, cashGiven, method, onFinish }) {
  const change = cashGiven - total;

  return (
    <div style={{ marginTop: 20 }}>
      <h3>=== CAFE POS ===</h3>

      {items.map((item) => (
        <div key={item.name}>
          {item.name} x{item.qty} —{" "}
          {formatRupiah(item.price * item.qty)}
        </div>
      ))}

      <hr />

      <p>Total: {formatRupiah(total)}</p>
      <p>Payment: {method.toUpperCase()}</p>

      {method === "cash" && (
        <>
          <p>Cash: {formatRupiah(cashGiven)}</p>
          <p>Change: {formatRupiah(change)}</p>
        </>
      )}

      <button onClick={() => window.print()}>
        Print Receipt 🖨
      </button>

      <button
        style={{ marginLeft: 10 }}
        onClick={onFinish}
      >
        Finish
      </button>
    </div>
  );
}

export default Receipt;
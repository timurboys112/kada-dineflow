import { useOrder } from "../context/OrderContext";
import { useState } from "react";
import CheckoutModal from "../components/CheckoutModal";
import { formatRupiah } from "../utils/formatRupiah";

function OrderPanel() {
  const { items, increaseQty, decreaseQty, subtotal, tax, total } = useOrder();
  const [open, setOpen] = useState(false);

  return (
    <div className="order">
      <h3>Current Order</h3>

      {items.length === 0 && (
        <p style={{ marginTop: 40, color: "#888" }}>
          Order is empty
        </p>
      )}

      {items.map((item) => (
        <div
          key={item.name}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <div>
            {item.name}
            <br />
            <button onClick={() => decreaseQty(item.name)}>−</button>
            {item.qty}
            <button onClick={() => increaseQty(item.name)}>+</button>
          </div>

          <div>{formatRupiah(item.price * item.qty)}</div>
        </div>
      ))}

      <hr style={{ margin: "20px 0" }} />

      <div>Subtotal: {formatRupiah(subtotal)}</div>
      <div>Tax (10%): {formatRupiah(tax)}</div>
      <h3>Total: {formatRupiah(total)}</h3>

      <button
        className="checkout"
        disabled={!items.length}
        onClick={() => setOpen(true)}
      >
        Checkout
      </button>

      <CheckoutModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default OrderPanel;
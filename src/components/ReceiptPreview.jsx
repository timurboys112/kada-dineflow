function ReceiptPreview({ cart = [], payments = [], total = 0 }) {
  const formatRp = (num) =>
    "Rp " + Number(num || 0).toLocaleString("id-ID");

  // =========================
  // HITUNG TOTAL CART
  // =========================
  const totalCart =
    total ||
    cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // =========================
  // HITUNG PEMBAYARAN
  // =========================

  // total semua payment
  const totalPaid = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  // cash payment
  const cashPaid = payments
    .filter((p) => p.method === "cash")
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  // non cash payment (QR + Card)
  const nonCashPaid = payments
    .filter((p) => p.method !== "cash")
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  // =========================
  // HITUNG SISA TAGIHAN
  // =========================
  const remainingAfterNonCash = Math.max(
    0,
    totalCart - nonCashPaid
  );

  // =========================
  // HITUNG CHANGE (LOGIC BENAR)
  // =========================
  const change = Math.max(
    0,
    cashPaid - remainingAfterNonCash
  );

  // sisa yang belum kebayar
  const remaining = Math.max(0, totalCart - totalPaid);

  const isPaid = totalPaid >= totalCart;

  // =========================
  // UI
  // =========================
  return (
    <div className="receipt">
      {/* HEADER */}
      <div className="receipt-header">
        <p>CAFE POS</p>
        <p>Jl. Kopi Bahagia No.1</p>
        <p>{new Date().toLocaleString()}</p>
      </div>

      <div className="receipt-divider" />

      {/* ITEMS */}
      {cart.map((item, i) => (
        <div key={i} className="receipt-item">
          <div>
            {item.name} x{item.qty}
          </div>
          <div>
            {formatRp(item.price * item.qty)}
          </div>
        </div>
      ))}

      <div className="receipt-divider" />

      {/* TOTAL */}
      <div className="receipt-row">
        <span>Total</span>
        <span>{formatRp(totalCart)}</span>
      </div>

      <div className="receipt-divider" />

      {/* PAYMENT BREAKDOWN */}
      <div style={{ marginTop: 10 }}>
        <strong>Payment</strong>

        {payments.length === 0 && (
          <div className="receipt-row">
            <span>-</span>
            <span>-</span>
          </div>
        )}

        {payments.map((p, i) => (
          <div key={i} className="receipt-row">
            <span>{p.method.toUpperCase()}</span>
            <span>{formatRp(p.amount)}</span>
          </div>
        ))}
      </div>

      <div className="receipt-divider" />

      {/* TOTAL PAID */}
      <div className="receipt-row">
        <span>Total Paid</span>
        <span>{formatRp(totalPaid)}</span>
      </div>

      {/* CHANGE */}
      {change > 0 && (
        <div className="receipt-row">
          <span>Change</span>
          <span>{formatRp(change)}</span>
        </div>
      )}

      {/* REMAINING (kalau kurang bayar) */}
      {remaining > 0 && (
        <div className="receipt-row" style={{ color: "red" }}>
          <span>Remaining</span>
          <span>{formatRp(remaining)}</span>
        </div>
      )}

      <div className="receipt-divider" />

      {/* STATUS */}
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          marginTop: 5,
          color: isPaid ? "green" : "red",
        }}
      >
        {isPaid ? "PAID" : "BELUM LUNAS"}
      </div>

      {/* FOOTER */}
      <div className="receipt-footer">
        <p>Terima kasih ❤️</p>
      </div>
    </div>
  );
}

export default ReceiptPreview;
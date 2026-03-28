import { useState } from "react";
import { useOrder } from "../context/OrderContext";
import { formatRupiah } from "../utils/formatRupiah";
import ReceiptPreview from "./ReceiptPreview";

function CheckoutModal({ open, onClose }) {
  const { items, total, clearOrder } = useOrder();

  const [payments, setPayments] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);

  if (!open) return null;

  // ===============================
  // PAYMENT LOGIC (FIXED)
  // ===============================

  const addPayment = (method) => {
    setPayments([...payments, { method, amount: 0 }]);
  };

  const updateAmount = (index, value) => {
    const updated = [...payments];
    updated[index].amount = Number(value) || 0;
    setPayments(updated);
  };

  const removePayment = (index) => {
    const updated = [...payments];
    updated.splice(index, 1);
    setPayments(updated);
  };

  // normalize data
  const safePayments = payments.map((p) => ({
    method: String(p.method).toLowerCase(),
    amount: Number(p.amount) || 0,
  }));

  // total semua pembayaran
  const totalPaid = safePayments.reduce(
    (sum, p) => sum + p.amount,
    0
  );

  // cash saja
  const cashPaid = safePayments
    .filter((p) => p.method === "cash")
    .reduce((sum, p) => sum + p.amount, 0);

  // non cash
  const nonCashPaid = safePayments
    .filter((p) => p.method !== "cash")
    .reduce((sum, p) => sum + p.amount, 0);

  // sisa setelah non cash
  const remainingAfterNonCash = Math.max(
    0,
    total - nonCashPaid
  );

  // kembalian hanya dari cash
  const change = Math.max(
    0,
    cashPaid - remainingAfterNonCash
  );

  // status bayar
  const isPaid = totalPaid >= total;

  // ===============================
  // PAY → show preview
  // ===============================
  const handlePay = () => {
    if (!isPaid) {
      alert("Pembayaran belum cukup!");
      return;
    }
    setShowReceipt(true);
  };

  // ===============================
  // PRINT RECEIPT WINDOW (FIXED)
  // ===============================
  const handlePrint = () => {
    const receiptHTML = `
      <html>
        <head>
          <style>
            body {
              font-family: monospace;
              padding: 20px;
              width: 260px;
            }
            hr { border-top: 1px dashed #000; }
          </style>
        </head>

        <body>
          <center>=== CAFE POS ===</center><br/>

          ${items
            .map(
              (i) =>
                `${i.name} x${i.qty} — ${formatRupiah(
                  i.price * i.qty
                )}`
            )
            .join("<br/>")}

          <br/><hr/>

          <b>Total: ${formatRupiah(total)}</b><br/><br/>

          <b>Payment:</b><br/>
          ${safePayments
            .map(
              (p) =>
                `${p.method.toUpperCase()} — ${formatRupiah(
                  p.amount
                )}`
            )
            .join("<br/>")}

          <br/><hr/>
          Total Paid: ${formatRupiah(totalPaid)}<br/>
          ${
            change > 0
              ? `Change: ${formatRupiah(change)}<br/>`
              : ""
          }

          <br/><hr/>
          <center>Terima kasih ❤️</center>

          <script>
            window.onload = () => window.print()
          </script>
        </body>
      </html>
    `;

    const win = window.open("", "", "width=320,height=600");
    win.document.write(receiptHTML);
    win.document.close();
  };

  // ===============================
  // FINISH ORDER
  // ===============================
  const finishOrder = () => {
    clearOrder();
    setPayments([]);
    setShowReceipt(false);
    onClose();
  };

  // ===============================
  // UI
  // ===============================

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Checkout</h2>

        {!showReceipt ? (
          <>
            <h3>Total: {formatRupiah(total)}</h3>

            {/* ADD PAYMENT */}
            <div style={{ marginTop: 20 }}>
              <button onClick={() => addPayment("cash")}>
                + Cash
              </button>

              <button
                style={{ marginLeft: 10 }}
                onClick={() => addPayment("card")}
              >
                + Card
              </button>

              <button
                style={{ marginLeft: 10 }}
                onClick={() => addPayment("qr")}
              >
                + QRIS
              </button>
            </div>

            {/* PAYMENT LIST */}
            <div style={{ marginTop: 20 }}>
              {payments.map((p, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: 10,
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <b style={{ width: 60 }}>
                    {p.method.toUpperCase()}
                  </b>

                  <input
                    type="number"
                    value={p.amount}
                    onChange={(e) =>
                      updateAmount(i, e.target.value)
                    }
                  />

                  <button onClick={() => removePayment(i)}>
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <hr />

            <p>Total Paid: {formatRupiah(totalPaid)}</p>

            <p>
              Status:
              <b style={{ color: isPaid ? "green" : "red" }}>
                {isPaid ? " PAID" : " UNPAID"}
              </b>
            </p>

            {change > 0 && (
              <p>Change: {formatRupiah(change)}</p>
            )}

            {/* FIX: BUTTON SEKARANG SELALU BISA DIKLIK */}
            <button style={{ marginTop: 20 }} onClick={handlePay}>
              Pay
            </button>
          </>
        ) : (
          <>
            <ReceiptPreview
              cart={items.map((item) => ({
                name: item.name,
                qty: item.qty,
                price: item.price,
              }))}
              payments={safePayments}
              total={total}
              totalPaid={totalPaid}
              change={change}
            />

            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <button onClick={handlePrint}>Print 🖨</button>
              <button onClick={finishOrder}>Finish</button>
            </div>
          </>
        )}

        <button style={{ marginTop: 15 }} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default CheckoutModal;
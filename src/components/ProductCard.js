import { useOrder } from "../context/OrderContext";
import { formatRupiah } from "../utils/formatRupiah";

function ProductCard({ name, price, image }) {
  const { items, addItem, increaseQty, decreaseQty } =
    useOrder();

  const item = items.find((i) => i.name === name);

  return (
    <div className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <div className="price">{formatRupiah(price)}</div>

      {!item ? (
        <button
          style={{ marginTop: 10 }}
          onClick={() => addItem({ name, price })}
        >
          Add +
        </button>
      ) : (
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <button onClick={() => decreaseQty(name)}>
            −
          </button>

          <strong>{item.qty}</strong>

          <button onClick={() => increaseQty(name)}>
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
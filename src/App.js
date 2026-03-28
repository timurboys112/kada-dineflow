import ProductGrid from "./components/ProductGrid";
import OrderPanel from "./layout/OrderPanel";
import "./App.css";

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>DineFlow</h2>
        <p>Order terminal</p>
      </aside>

      <main className="content">
        <ProductGrid />
      </main>

      <OrderPanel />
    </div>
  );
}

export default App;
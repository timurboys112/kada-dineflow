import { useState } from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    name: "Nasi Goreng",
    price: 25000,
    category: "food",
    image: "https://sanex.co.id/wp-content/uploads/2025/03/2734-1.webp",
  },
  {
    name: "Mie Goreng",
    price: 22000,
    category: "food",
    image: "https://www.dapurkobe.co.id/wp-content/uploads/mie-goreng-saus-tiram.jpg",
  },
  {
    name: "Sate Ayam",
    price: 30000,
    category: "food",
    image: "https://asset.kompas.com/crops/BJdOTeUCdwHWS6ImI9qDnf3s8nI=/0x0:1000x667/1200x800/data/photo/2023/12/19/6580e31d4d33e.jpeg",
  },
  {
    name: "Rendang",
    price: 35000,
    category: "food",
    image: "https://www.astronauts.id/blog/wp-content/uploads/2023/03/Resep-Rendang-Daging-Sapi-Untuk-Lebaran-Gurih-dan-Nikmat-1024x683.jpg",
  },
  {
    name: "Es Teh Manis",
    price: 8000,
    category: "beverage",
    image: "https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/d531a9c8889647e8bce385397811a7f5~tplv-aphluv4xwc-resize-jpeg:700:0.jpeg",
  },
  {
    name: "Es Jeruk",
    price: 10000,
    category: "beverage",
    image: "https://dcostseafood.id/wp-content/uploads/2021/12/ES-JERUK-murni.jpg",
  },
  {
    name: "Kopi",
    price: 12000,
    category: "beverage",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Javanese_Kopi_Tubruk.jpg",
  },
  {
    name: "Jus Alpukat",
    price: 15000,
    category: "beverage",
    image: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/b697f3e1-cfdc-4f59-9845-fcabed300222_Go-Biz_20201023_145223.jpeg",
  },
];

function ProductGrid() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? products
      : products.filter((p) => p.category === filter);

  // badge count
  const totalAll = products.length;
  const totalFood = products.filter(p => p.category === "food").length;
  const totalDrink = products.filter(p => p.category === "beverage").length;

  return (
    <>
      {/* FILTER TABS */}
      <div className="filter-tabs">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          🍽 All <span className="badge">{totalAll}</span>
        </button>

        <button
          className={filter === "food" ? "active" : ""}
          onClick={() => setFilter("food")}
        >
          🍔 Food <span className="badge">{totalFood}</span>
        </button>

        <button
          className={filter === "beverage" ? "active" : ""}
          onClick={() => setFilter("beverage")}
        >
          ☕ Drinks <span className="badge">{totalDrink}</span>
        </button>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid">
        {filtered.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </>
  );
}

export default ProductGrid;
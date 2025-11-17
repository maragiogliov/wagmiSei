// ShopCatalog.jsx
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ShopCatalog.module.css";
import ShopFilters from "./ShopFilters";
import ShopProductGrid from "./ShopProductGrid";
import { listProducts } from "../../services/ProductsService";

export default function ShopCatalog() {
  const [products, setProducts] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("ALL");
  const location = useLocation();

  useEffect(() => {
    setProducts(listProducts());
  }, []);

  // Leer q desde la URL (?q=...)
  const q = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return (params.get("q") || "").trim().toLowerCase();
  }, [location.search]);

  return (
    <div className={styles.catalogWrapper}>
      {/* Tabs de skill */}
      <ShopFilters
        selectedSkill={selectedSkill}
        onSkillChange={setSelectedSkill}
      />

      <div className={styles.layout}>
        <ShopProductGrid
          products={products}     // todos los productos
          searchQuery={q}         // texto de búsqueda desde la URL
          selectedSkill={selectedSkill} // filtro por skill
        />
      </div>
    </div>
  );
}

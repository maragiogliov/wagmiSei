import React from "react";
import styles from "./ShopHeader.module.css";

export default function ShopHeader({
  brandTitle = "AMULET",
  subtitle = "LONGEVITY ENHANCEMENT CATALOG",
  cartCount = 0,
  onCartClick,
}) {
  return (
    <header className={styles.header} role="banner">
      {/* Brand */}
      <div className={styles.brandGroup}>
        <div className={styles.logoText}>{brandTitle}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>


        <button
          type="button"
          className={styles.cartButton}
          onClick={onCartClick}
          aria-label="Open cart"
        >
          <img className={styles.icon20} src="/assets/cart.svg" alt="" />
          <span className={styles.cartLabel}>CART</span>
          {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}

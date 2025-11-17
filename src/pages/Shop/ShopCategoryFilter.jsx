import styles from "./ShopCategoryFilter.module.css";

export default function ShopCategoryFilter() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.filters}>
        <button className={`${styles.filterItem} ${styles.active}`}>
          <span>ALL<br/>ITEMS</span>
        </button>

        <button className={styles.filterItem}>
          <span>MEDS</span>
        </button>

        <button className={styles.filterItem}>
          <span>LAB<br/>TEST</span>
        </button>

        <button className={styles.filterItem}>
          <span>SUPPLE-<br/>MENTS</span>
        </button>
      </div>
    </aside>
  );
}

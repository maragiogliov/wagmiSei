// OrderHistory.jsx
import React from "react";
import styles from "./OrderHistory.module.css";
import OrderDetailsPopUp from "../../components/OrderDetailsPopUp.jsx";

const PAGE_SIZE = 20;

const baseOrders = [
  {
    number: 1,
    type: "SUPPLEMENT",
    icon: "/assets/supplementContainer.svg",
    description: "BJ Longevity Mix",
    orderStatus: "SENT",
    orderStatusClass: "info",
    paymentStatus: "PAID",
    paymentStatusClass: "success",
    date: "Aug 19, 2025",
  },
  {
    number: 2,
    type: "MEDICATION",
    icon: "/assets/medicationPill.svg",
    description: "Sildenafil",
    orderStatus: "SENT",
    orderStatusClass: "info",
    paymentStatus: "PAID",
    paymentStatusClass: "success",
    date: "Aug 19, 2025",
  },
  {
    number: 3,
    type: "MEDICATION",
    icon: "/assets/medicationPill.svg",
    description: "Tadalafil",
    orderStatus: "SENT",
    orderStatusClass: "info",
    paymentStatus: "PAID",
    paymentStatusClass: "success",
    date: "Aug 15, 2025",
  },
  {
    number: 4,
    type: "SUPPLEMENT",
    icon: "/assets/supplementContainer.svg",
    description: "Omega-3 Complex",
    orderStatus: "SENT",
    orderStatusClass: "info",
    paymentStatus: "PAID",
    paymentStatusClass: "success",
    date: "Aug 10, 2025",
  },
  {
    number: 5,
    type: "MEDICATION",
    icon: "/assets/medicationPill.svg",
    description: "Finasteride",
    orderStatus: "SENT",
    orderStatusClass: "info",
    paymentStatus: "PAID",
    paymentStatusClass: "success",
    date: "Aug 3, 2025",
  },
  {
    number: 6,
    type: "SUPPLEMENT",
    icon: "/assets/supplementContainer.svg",
    description: "Vitamin D3",
    orderStatus: "PROCESSING",
    orderStatusClass: "warn",
    paymentStatus: "PENDING",
    paymentStatusClass: "warn",
    date: "Jul 28, 2025",
  },
  {
    number: 7,
    type: "MEDICATION",
    icon: "/assets/medicationPill.svg",
    description: "Metformin",
    orderStatus: "SENT",
    orderStatusClass: "info",
    paymentStatus: "PAID",
    paymentStatusClass: "success",
    date: "Jul 20, 2025",
  },
  {
    number: 8,
    type: "SUPPLEMENT",
    icon: "/assets/supplementContainer.svg",
    description: "NMN Capsules",
    orderStatus: "SENT",
    orderStatusClass: "info",
    paymentStatus: "PAID",
    paymentStatusClass: "success",
    date: "Jul 10, 2025",
  },
  {
    number: 9,
    type: "MEDICATION",
    icon: "/assets/medicationPill.svg",
    description: "Rapamycin",
    orderStatus: "PROCESSING",
    orderStatusClass: "warn",
    paymentStatus: "FAILED",
    paymentStatusClass: "error",
    date: "Jul 5, 2025",
  },
  {
    number: 10,
    type: "SUPPLEMENT",
    icon: "/assets/supplementContainer.svg",
    description: "Resveratrol Complex",
    orderStatus: "SENT",
    orderStatusClass: "info",
    paymentStatus: "PAID",
    paymentStatusClass: "success",
    date: "Jun 29, 2025",
  },
];

// Generate 40 more orders to reach 50 total
const extraOrders = Array.from({ length: 40 }, (_, i) => {
  const n = i + 11; // start at 11
  const isEven = n % 2 === 0;
  const isProcessing = n % 5 === 0;

  return {
    number: n,
    type: isEven ? "SUPPLEMENT" : "MEDICATION",
    icon: isEven
      ? "/assets/supplementContainer.svg"
      : "/assets/medicationPill.svg",
    description: isEven ? "Longevity Stack " + n : "Medication Pack " + n,
    orderStatus: isProcessing ? "PROCESSING" : "SENT",
    orderStatusClass: isProcessing ? "warn" : "info",
    paymentStatus: isProcessing ? "PENDING" : "PAID",
    paymentStatusClass: isProcessing ? "warn" : "success",
    date: "Jun " + (28 - (i % 28)) + ", 2025",
  };
});

const ORDERS = [...baseOrders, ...extraOrders]; // total = 50



export default function OrderHistory() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortConfig, setSortConfig] = React.useState({
    key: "date",
    direction: "desc",
  });

  // ✅ popup state
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const openDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
    // optional: clear after close
    // setSelectedOrder(null);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const sortedOrders = React.useMemo(() => {
    const ordersCopy = [...ORDERS];
    if (!sortConfig) return ordersCopy;

    ordersCopy.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === "number") {
        const diff = aVal - bVal;
        return sortConfig.direction === "asc" ? diff : -diff;
      }

      if (sortConfig.key === "date") {
        const aDate = new Date(aVal);
        const bDate = new Date(bVal);
        const diff = aDate - bDate;
        return sortConfig.direction === "asc" ? diff : -diff;
      }

      aVal = String(aVal).toLowerCase();
      bVal = String(bVal).toLowerCase();

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return ordersCopy;
  }, [sortConfig]);

  const totalPages = Math.ceil(sortedOrders.length / PAGE_SIZE);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handleSort = (key) => {
    setCurrentPage(1);
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentOrders = sortedOrders.slice(startIndex, startIndex + PAGE_SIZE);

  const renderSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return null;
    return (
      <span className={styles.sortIcon}>
        {sortConfig.direction === "asc" ? "▲" : "▼"}
      </span>
    );
  };

  return (
    <div className={styles.orderHistoryLight}>
      <div className={styles.orderHistoryContainer}>
        <div className={styles.ohScroll}>
          {/* grid header */}
          <div className={`${styles.ohGrid} ${styles.ohHead}`}>
            <div
              className={styles.sortableHead}
              onClick={() => handleSort("number")}
            >
              #{renderSortIcon("number")}
            </div>

            <div
              className={styles.sortableHead}
              onClick={() => handleSort("type")}
            >
              TYPE{renderSortIcon("type")}
            </div>

            <div
              className={`${styles.hideSm} ${styles.sortableHead}`}
              onClick={() => handleSort("description")}
            >
              Description{renderSortIcon("description")}
            </div>

            <div
              className={styles.sortableHead}
              onClick={() => handleSort("orderStatus")}
            >
              Order Status{renderSortIcon("orderStatus")}
            </div>

            <div
              className={`${styles.hideMd} ${styles.sortableHead}`}
              onClick={() => handleSort("paymentStatus")}
            >
              Payment Status{renderSortIcon("paymentStatus")}
            </div>

            <div
              className={styles.sortableHead}
              onClick={() => handleSort("date")}
            >
              Date{renderSortIcon("date")}
            </div>

            <div>Actions</div>
          </div>

          {/* rows */}
          {currentOrders.map((order) => (
            <div key={order.number} className={`${styles.ohGrid} ${styles.ohRow}`}>
              <div className={styles.numberInfo}>{order.number}</div>

              <div className={styles.ohType}>
                <img src={order.icon} alt="" className={styles.ohIco} />
                {order.type}
              </div>

              <div className={styles.hideSm}>{order.description}</div>

              <div>
                <span className={`${styles.pill} ${styles[order.orderStatusClass]}`}>
                  <span
                    className={`${styles.statusDot} ${styles[order.orderStatusClass]}`}
                  />
                  {order.orderStatus}
                </span>
              </div>

              <div className={styles.hideMd}>
                <span className={`${styles.pill} ${styles[order.paymentStatusClass]}`}>
                  <span
                    className={`${styles.statusDot} ${styles[order.paymentStatusClass]}`}
                  />
                  {order.paymentStatus}
                </span>
              </div>

              <div className={styles.dateInfo}>{order.date}</div>

              <div>
                {/* ✅ click opens popup */}
                <div
                  className={styles.btnGhost}
                  role="button"
                  tabIndex={0}
                  onClick={() => openDetails(order)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openDetails(order);
                  }}
                >
                  VIEW DETAILS
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* pagination */}
        <div className={styles.ohPager}>
          <button
            className={styles.iconBtn}
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            <img src="/assets/chevron-back-outline.svg" alt="Prev" />
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className={styles.iconBtn}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <img src="/assets/chevron-forward-outline.svg" alt="Next" />
          </button>
        </div>
      </div>

      {/* ✅ popup render */}
      {isDetailsOpen && (
        <OrderDetailsPopUp
          isOpen={isDetailsOpen}
          onClose={closeDetails}
          order={selectedOrder}
        />
      )}
    </div>
  );
}

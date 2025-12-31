// visits.js
import React, { useEffect, useState } from "react";
import styles from ".././pages/Visits/visits.module.css";

const VISITS = [
  {
    id: 1,
    doctorName: "Dr. Katherine Voss",
    specialization: "Longevity Medicine",
    date: "01.09.2025",
    status: "pending",
    consultationName: "Longevity Consultation",
    consultationPrice: "$ 299.00",
    visitReason: "Longevity enhancement optimization and metabolic assessment",
    statusMessage:
      "Your longevity enhancement protocol has been sent to the doctor for review.",
  },
];

const STATUS_CONFIG = {
  pending: {
    label: "PENDING QUESTIONNAIRE",
    chipClass: styles.chipWarn,
    textClass: styles.statusTextWarn,
    icon: "/assets/bx-time.svg",
    iconAlt: "Pending",
  },
  approved: {
    label: "APPROVED",
    chipClass: styles.chipOk,
    textClass: styles.statusTextOk,
    icon: "/assets/checkbox-approved-green.svg",
    iconAlt: "Approved",
  },
  denied: {
    label: "DENIED",
    chipClass: styles.chipErr,
    textClass: styles.statusTextErr,
    icon: "/assets/cancel-red.svg",
    iconAlt: "Denied",
  },
};

export default function Visits({ isOpen = true, onClose }) {
  // keep a single visit or fetch it later
  const [selectedVisit] = useState(VISITS[0]);
  const selectedConfig = STATUS_CONFIG[selectedVisit.status];

  // ✅ lock page scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // ✅ close on ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // ✅ don't render anything if closed
  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={() => onClose?.()} // click outside closes
      role="dialog"
      aria-modal="true"
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* close button (optional but recommended) */}
        <button
          type="button"
          className={styles.modalClose}
          onClick={() => onClose?.()}
          aria-label="Close"
        >
          ✕
        </button>

        {/* YOUR EXISTING CONTENT (unchanged) */}
        <div className={styles.visitsOverview}>
          <div className={styles.container}>
            {/* Page title */}
            <div className={styles.pageTitle}>
              <span className={styles.pageTitleText}>
                ORDER 42069
              </span>
            </div>

            {/* ONLY RIGHT PANEL */}
            <div className={styles.mainGridSingle}>
              <div className={styles.rightCol}>
                <div className={styles.panelHeader}>
                  <div
                    className={`${styles.statusChip} ${selectedConfig.chipClass}`}
                  >
                    <span className={styles.statusIconWrap}>
                      <img
                        className={styles.statusIcon}
                        src={selectedConfig.icon}
                        alt={selectedConfig.iconAlt}
                      />
                    </span>
                    <span className={selectedConfig.textClass}>
                      {selectedConfig.label}
                    </span>
                  </div>

                  <div className={`${styles.statusChip} ${styles.chipWarn}`}>
                    <span className={styles.statusTextWarn}>
                      PAYMENT PENDING
                    </span>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoSection}>
                    <div className={styles.infoTitle}>ORDER ITEMS</div>

                    <div className={styles.infoRow}>
                      <span className={styles.statusIconWrap}>
                        <img
                          className={styles.statusIcon}
                          src={selectedConfig.icon}
                          alt=""
                        />
                      </span>
                      <p className={styles.infoText}>
                        Sildenafil 50mg — Medication
                        <br />
                        Sildenafil Citrate 50mg oral tablet for erectile dysfunction
                        treatment.
                        <br />
                        <strong>Vendor:</strong> Health Labs Inc. — $29.99
                      </p>
                    </div>

                    <div className={styles.infoRow}>
                      <span className={styles.statusIconWrap}>
                        <img
                          className={styles.statusIcon}
                          src={selectedConfig.icon}
                          alt=""
                        />
                      </span>
                      <p className={styles.infoText}>
                        Doctor Visit — Required for medication prescription
                        <br />
                        <strong>Vendor:</strong> Wellness Pharmacy — $100.00
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

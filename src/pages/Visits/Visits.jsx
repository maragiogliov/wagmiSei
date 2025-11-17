// visits.js
import React, { useState } from "react";
import styles from "./visits.module.css";

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
  {
    id: 2,
    doctorName: "Dr. Katherine Voss",
    specialization: "Longevity Medicine",
    date: "22.08.2025",
    status: "approved",
    consultationName: "Longevity Consultation",
    consultationPrice: "$ 299.00",
    visitReason: "Follow-up on longevity protocol and lab results review.",
    statusMessage:
      "Your visit has been approved. You can proceed with the scheduled consultation.",
  },
  {
    id: 3,
    doctorName: "Dr. Katherine Voss",
    specialization: "Longevity Medicine",
    date: "22.08.2025",
    status: "denied",
    consultationName: "Longevity Consultation",
    consultationPrice: "$ 299.00",
    visitReason: "Longevity consultation request with incomplete data.",
    statusMessage:
      "Your visit request was not approved. Please review the requirements and try again.",
  },
];

// Config para clases/íconos según estado
const STATUS_CONFIG = {
  pending: {
    label: "PENDING",
    cardClass: styles.cardBlue,
    chipClass: styles.chipWarn,
    textClass: styles.statusTextWarn,
    icon: "/assets/bx-time.svg",
    iconAlt: "Pending",
  },
  approved: {
    label: "APPROVED",
    cardClass: styles.cardGrey,
    chipClass: styles.chipOk,
    textClass: styles.statusTextOk,
    icon: "/assets/checkbox-approved-green.svg",
    iconAlt: "Approved",
  },
  denied: {
    label: "DENIED",
    cardClass: styles.cardGrey,
    chipClass: styles.chipErr,
    textClass: styles.statusTextErr,
    icon: "/assets/cancel-red.svg",
    iconAlt: "Denied",
  },
};

export default function Visits() {
  const [selectedVisit, setSelectedVisit] = useState(VISITS[0]);

  const selectedConfig = STATUS_CONFIG[selectedVisit.status];

  return (
    <div className={styles.visitsOverview}>
      <div className={styles.container}>
        {/* Page title */}
        <div className={styles.pageTitle}>
          <span className={styles.pageTitleText}>LONGEVITY DOCTOR VISITS</span>
        </div>

        {/* Main grid: left list + right panel */}
        <div className={styles.mainGrid}>
          {/* LEFT — visits list */}
          <div className={styles.leftCol}>
            {VISITS.map((visit) => {
              const config = STATUS_CONFIG[visit.status];
              const isActive = selectedVisit.id === visit.id;

              return (
                <div
                  key={visit.id}
                  className={`${styles.card} ${config.cardClass} ${
                    isActive ? styles.cardActive : ""
                  }`}
                  onClick={() => setSelectedVisit(visit)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedVisit(visit);
                    }
                  }}
                >
                  <div className={styles.cardMeta}>
                    <div className={styles.cardTitle}>{visit.doctorName}</div>
                    <div className={styles.cardSubtitle}>
                      {visit.specialization}
                    </div>
                    <div className={styles.cardDate}>{visit.date}</div>
                  </div>

                  <div
                    className={`${styles.statusChip} ${config.chipClass}`}
                  >
                    <span className={styles.statusIconWrap}>
                      <img
                        className={styles.statusIcon}
                        src={config.icon}
                        alt={config.iconAlt}
                      />
                    </span>
                    <span className={config.textClass}>{config.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT — panel (dinámico según selectedVisit) */}
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
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoSection}>
                <div className={styles.infoTitle}>VISIT STATUS</div>
                <div className={styles.infoRow}>
                  <span className={styles.statusIconWrap}>
                    <img
                      className={styles.statusIcon}
                      src={selectedConfig.icon}
                      alt={selectedConfig.iconAlt}
                    />
                  </span>
                  <p className={styles.infoText}>
                    {selectedVisit.statusMessage}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.tabsRow}>
              <div className={`${styles.tabChip} ${styles.tabActive}`}>
                <span className={styles.tabTextActive}>OVERVIEW</span>
              </div>
              <div className={styles.tabChip}>
                <span className={styles.tabText}>MEDICATIONS</span>
              </div>
              <div className={styles.tabChip}>
                <span className={styles.tabText}>ASSESSMENTS</span>
              </div>
              <div className={styles.tabChip}>
                <span className={styles.tabText}>REQUIREMENTS</span>
              </div>
            </div>

            <div className={styles.detailsCard}>
              <div className={styles.infoTitle}>VISIT DETAILS</div>

              <div className={styles.twoCol}>
                <div className={styles.detailTile}>
                  <div className={styles.detailBlock}>
                    <div className={styles.detailLabel}>DOCTOR</div>
                    <div className={styles.detailStrong}>
                      {selectedVisit.doctorName}
                    </div>
                    <div className={styles.cardDate}>
                      {selectedVisit.specialization}
                    </div>
                  </div>
                </div>

                <div className={styles.detailTile}>
                  <div className={styles.detailBlock}>
                    <div className={styles.detailLabel}>CONSULTATION</div>
                    <div className={styles.detailStrong}>
                      {selectedVisit.consultationName}
                    </div>
                    <div className={styles.cardDate}>
                      {selectedVisit.consultationPrice}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.detailLong}>
                <div className={styles.detailBlock}>
                  <div className={styles.detailLabel}>VISIT REASON</div>
                  <p className={styles.detailBody}>
                    {selectedVisit.visitReason}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* trailing icon */}
        <div className={styles.trailingIcon}>
          <img
            className={styles.infiniteOutline}
            src="/assets/infinite-outline.svg"
            alt="Amulet infinite"
          />
        </div>
      </div>
    </div>
  );
}

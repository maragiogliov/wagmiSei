// src/pages/Product/ProductPage.js
import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import styles from "./ProductPage.module.css";
import { getProductById } from "../../services/ProductsService";
import { useCart } from "../../store/CartContext"; // ✅ global cart

export default function ProductPage() {
  const { id } = useParams();

  const { addItem } = useCart(); // ✅ use cart hook


  const product = useMemo(() => getProductById(id), [id]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));
  const incrementQuantity = () => setQuantity((q) => q + 1);

  if (!product) {
    return (
      <div className={styles.productPageLight}>
        <div className={styles.pageShell} style={{ padding: 24 }}>
          <p>Product not found.</p>
          <Link to="/shop">← Back to catalog</Link>
        </div>
      </div>
    );
  }

  const {
    name = "Unnamed product",
    description = "",
    price = 0,
    cycles = 60,
    inventoryAvailable = true,
    metrics = { calmRise: 0.6, clarityRise: 0.7 },
    dosageProtocol = "See label",
    cycleCount = cycles ?? 60,
    composition = [],
    skill = "RESTORATION",
    imageLarge = "/assets/FuturisticPillProductPage.png",
  } = product;

  const calmPct = Math.round((metrics?.calmRise ?? 0) * 100);
  const clarityPct = Math.round((metrics?.clarityRise ?? 0) * 100);
  const totalPrice = (price * quantity).toFixed(2);


  const handleAddToCart = () => {
    if (!inventoryAvailable || quantity < 1) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  };


  return (
    <div className={styles.productPageLight}>
      <div className={styles.pageShell}>
       

        <div className={styles.canvas}>
          {/* LEFT COLUMN */}

          <div className={styles.mediaColumn}>
                {/* Badges */}
            <div className={styles.badgeRow}>
              <div className={styles.skillBadge}>
                <div className={styles.badgeText}>
              {String(skill).toUpperCase()}
                </div>
              </div>
            </div>

            <img
              className={styles.productHeroImage}
              src={imageLarge}
              alt={`${name} product`}
            />

             <div className={styles.badgeRow}>
          
            </div>
            
          </div>

          {/* RIGHT COLUMN */}
          <section className={styles.detailsPane} aria-labelledby="product-title">
        

            {/* Main details */}
            <div className={styles.detailsColumn}>
              <header className={styles.headerBlock}>
                <h1 id="product-title" className={styles.title}>{name}</h1>
                {description && <p className={styles.description}>{description}</p>}
              </header>

              <div className={styles.metricsLegend}>
                <div className={styles.labelRow}>
                  <img
                    className={styles.legendIcon}
                    src="/assets/heartbeatBlue.svg"
                    alt=""
                  />
                  <div className={styles.legendText}>ENHANCEMENT METRICS</div>
                </div>
              </div>

              {/* Metrics */}
              <section className={styles.metricsSection} aria-label="Enhancement metrics">
                <div className={styles.metricsList}>
                  {/* Calm */}
                  <div className={`${styles.metricRow} ${styles.metricRowCalm}`}>
                    <div className={styles.labelRow}>
                      <div className={styles.metricLabel}>CALM RISE</div>
                    </div>
                    <div className={styles.meter}>
                      <div className={styles.meterTrack}>
                        <div
                          className={`${styles.meterFill} ${styles.meterFillCalm}`}
                          style={{
                            width: `${Math.min(100, Math.max(0, calmPct))}%`,
                          }}
                        />
                      </div>
                      <div className={styles.metricValue}>{`+${calmPct}%`}</div>
                    </div>
                  </div>

                  {/* Clarity */}
                  <div className={`${styles.metricRow} ${styles.metricRowClarity}`}>
                    <div className={styles.labelRow}>
                      <div className={styles.metricLabel}>CLARITY RISE</div>
                    </div>
                    <div className={styles.meter}>
                      <div className={styles.meterTrack}>
                        <div
                          className={`${styles.meterFill} ${styles.meterFillClarity}`}
                          style={{
                            width: `${Math.min(100, Math.max(0, clarityPct))}%`,
                          }}
                        />
                      </div>
                      <div className={styles.metricValue}>{`+${clarityPct}%`}</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Purchase panel */}
              <section className={styles.purchaseCard} aria-label="Purchase">
                <div className={styles.purchaseBody}>
                  <div className={styles.purchaseRow}>
                    <div className={styles.priceBlock}>
                      <div className={styles.price}>${price.toFixed(2)}</div>
                      <div className={styles.cycles}>{cycleCount} CYCLES</div>
                    </div>
                    <div className={styles.stockBadge}>
                      <div className={styles.stockText}>
                        {inventoryAvailable
                          ? "INVENTORY AVAILABLE"
                          : "OUT OF STOCK"}
                      </div>
                    </div>
                  </div>

                  <img className={styles.divider} src="img/line-78.svg" alt="" />

                  <div className={styles.purchaseRow}>
                    {/* Quantity Controls */}
                    <div className={styles.quantityControls}>
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        onClick={decrementQuantity}
                        aria-label="Decrease quantity"
                      >
                        <img
                          className={styles.icon24}
                          src="/assets/minus-thick-grey.svg"
                          alt=""
                        />
                      </button>
                      <div className={styles.qtyValue}>{quantity}</div>
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        onClick={incrementQuantity}
                        aria-label="Increase quantity"
                      >
                        <img
                          className={styles.icon24}
                          src="/assets/plus-thick-grey.svg"
                          alt=""
                        />
                      </button>
                    </div>

                    {/* CTA */}
                    <button
                      type="button"
                      className={`${styles.ctaButton} ${added ? styles.ctaAdded : ""}`}
                      onClick={handleAddToCart}
                      disabled={!inventoryAvailable}
                      aria-disabled={!inventoryAvailable}
                      aria-label={`Add ${name} to cart`}
                    >
                      <img
                        className={styles.ctaIcon}
                        src="/assets/shopping-bag-white.svg"
                        alt=""
                      />
                  <div className={styles.ctaLabel}>
  {added ? "Added!" : `Add to cart - $${totalPrice}`}
</div>

                    </button>
                  </div>
                </div>
              </section>

              {/* Technical specs */}
              <section className={styles.specsSection} aria-label="Technical specifications">
                <div className={styles.specsHeading}>
                  <div className={styles.labelRow}>
                    <img
                      className={styles.headingIcon}
                      src="/assets/infoSquareBlue.svg"
                      alt=""
                    />
                    <div className={styles.headingText}>
                      TECHNICAL SPECIFICATIONS
                    </div>
                  </div>
                </div>

                <div className={styles.specsGrid}>
                  <article className={styles.specCard}>
                    <div className={styles.specCardBody}>
                      <div className={styles.metricLabel}>DOSAGE PROTOCOL:</div>
                      <div className={styles.dosageValue}>{dosageProtocol}</div>
                    </div>
                  </article>

                  <article className={`${styles.specCard} ${styles.specCardRight}`}>
                    <div className={styles.specCardBody}>
                      <div className={styles.metricLabel}>CYCLE COUNT:</div>
                      <div className={styles.cycleValue}>{cycleCount}</div>
                    </div>
                  </article>
                </div>
              </section>

              {/* Composition */}
              <section className={styles.compositionSection} aria-label="Molecular composition">
                <div className={styles.compositionCard}>
                  <div className={styles.compositionHeader}>
                    <div className={styles.metricLabel}>
                      MOLECULAR COMPOSITION:
                    </div>
                    <div className={styles.compositionChips}>
                      {(composition?.length ? composition : ["See label"]).map(
                        (item, idx) => (
                          <div key={idx} className={styles.compositionChip}>
                            <div className={styles.chipText}>{item}</div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

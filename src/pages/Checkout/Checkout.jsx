// src/pages/Checkout/Shipping.jsx
import React, { useState } from "react";
import styles from "./Checkout.module.css";
import { useCart } from "../../store/CartContext";
import OrderSummary from "./OrderSummary";
import PRODUCTS from "../../data/products.json"; // adjust path if needed



export default function Checkout() {
const { items, count, total, addItem } = useCart();
  

  // simple derived totals (OrderSummary still renders shipping)


  // local UI state (presentational)
  const [shipProtect, setShipProtect] = useState(false);
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);
  const [payMethod, setPayMethod] = useState("card"); // "card" | "paypal"
  const [showBrandsTip, setShowBrandsTip] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: validate + persist data, then route
  };

    // inside your component, after you have access to `items` from useCart()
    const cartLines = Object.values(items || {});
    const cartIds = new Set(cartLines.map(l => l?.product?.id).filter(Boolean));
    const cartCats = cartLines.map(l => l?.product?.category).filter(Boolean);

    // helper: find the most common value
    const mode = (arr) => {
    const m = new Map();
    arr.forEach(v => m.set(v, (m.get(v) || 0) + 1));
    let best = null, max = 0;
    for (const [k, n] of m) if (n > max) { best = k; max = n; }
    return best;
    };

    const targetCategory = mode(cartCats) || PRODUCTS[0]?.category;

    // pool: same category, not already in cart
    let pool = PRODUCTS.filter(p => p.category === targetCategory && !cartIds.has(p.id));

    // fallback if <3 found
    if (pool.length < 3) {
    const extras = PRODUCTS.filter(p => !cartIds.has(p.id) && p.category !== targetCategory);
    pool = [...pool, ...extras];
    }

    // shuffle + take 3
    const recommended = [...pool]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

    // money format
    const fmtMoney = (n, currency = "USD", locale = "en-US") =>
    new Intl.NumberFormat(locale, { style: "currency", currency }).format(Number(n || 0));


  return (
    <div className={styles.shippingPage}>
      <div className={styles.contentGrid}>
        {/* Left column: one-page checkout form */}
        <section className={styles.formCard} aria-label="Checkout">
          <form className={styles.formBody} onSubmit={onSubmit} noValidate>
            {/* =======================
                Contact
               ======================= */}
            <div className={styles.sectionHeaderRow}>
              <h2 className={styles.sectionTitle}>Contact</h2>
              <button type="button" className={styles.linkInline}>
                Sign in
              </button>
            </div>

            <div className={styles.rowOne}>
              <div className={styles.float}>
                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  placeholder=" "
                  className={styles.hasFloat}
                  required
                />
                <label htmlFor="contactEmail" className={styles.floatLabel}>
                  Email
                </label>
              </div>
            </div>

            <label className={styles.checkRow}>
              <input type="checkbox" />
              <span>Email me with news and offers</span>
            </label>

            {/* =======================
                Shipping Protection
               ======================= */}
            <div className={styles.cardRow}>
              <label className={styles.cardRowLeft}>
                <input
                  type="checkbox"
                  checked={shipProtect}
                  onChange={(e) => setShipProtect(e.target.checked)}
                />
                <span className={styles.protectIconWrap}>
                  <img src="/assets/CheckSecurityShield.png" alt="" />
                </span>
                <div className={styles.cardCol}>
                  <div className={styles.cardTitle}>Shipping Protection (Incl. Priority)</div>
                  <div className={styles.cardSub}>
                    Ship smarter with built-in Protection and Priority Shipping 🚚💨
                  </div>
                </div>
              </label>
              <div className={styles.cardPrice}>£3.00</div>
            </div>



<br />
            {/* =======================
                Delivery (Shipping address)
               ======================= */}
            <h2 className={styles.sectionTitle}>Delivery</h2>

            <div className={styles.rowOne}>
              <div className={styles.float}>
                <select
                  id="country"
                  name="country"
                  className={styles.hasFloat}
                  required
                  defaultValue=""
                >
                  <option value="" disabled hidden></option>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="EU">European Union</option>
                </select>
                <label htmlFor="country" className={styles.floatLabel}>
                  Country/Region
                </label>
              </div>
            </div>

            <div className={styles.rowTwo}>
              <div className={styles.float}>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder=" "
                  className={styles.hasFloat}
                  required
                />
                <label htmlFor="firstName" className={styles.floatLabel}>
                  First name
                </label>
              </div>

              <div className={styles.float}>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder=" "
                  className={styles.hasFloat}
                  required
                />
                <label htmlFor="lastName" className={styles.floatLabel}>
                  Last name
                </label>
              </div>
            </div>

            <div className={styles.rowOne}>
              <div className={styles.float}>
                <input
                  id="address1"
                  name="address1"
                  type="text"
                  placeholder=" "
                  className={styles.hasFloat}
                  required
                />
                <label htmlFor="address1" className={styles.floatLabel}>
                  Address
                </label>
              </div>
            </div>

            <div className={styles.rowOne}>
              <div className={styles.float}>
                <input
                  id="address2"
                  name="address2"
                  type="text"
                  placeholder=" "
                  className={styles.hasFloat}
                />
                <label htmlFor="address2" className={styles.floatLabel}>
                  Apartment, suite, etc. (optional)
                </label>
              </div>
            </div>

            <div className={styles.rowTwo}>
              <div className={styles.float}>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder=" "
                  className={styles.hasFloat}
                  required
                />
                <label htmlFor="city" className={styles.floatLabel}>
                  City
                </label>
              </div>

              <div className={styles.float}>
                <input
                  id="postcode"
                  name="postcode"
                  type="text"
                  placeholder=" "
                  className={styles.hasFloat}
                  required
                />
                <label htmlFor="postcode" className={styles.floatLabel}>
                  Postcode
                </label>
              </div>
            </div>

            <div className={styles.rowOne}>
              <div className={styles.float}>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder=" "
                  className={styles.hasFloat}
                />
                <label htmlFor="phone" className={styles.floatLabel}>
                  Phone
                </label>
              </div>
            </div>

            <label className={styles.checkRow}>
              <input type="checkbox" />
              <span>Text me with news and offers</span>
            </label>

<br />
            {/* =======================
                Upsells (stub)
               ======================= */}
           {/* inside your upsell block, replace the hardcoded array with this */}
<div className={styles.upsellRow}>
  {recommended.map((p) => (
    <div key={p.id} className={styles.productCard}>

<div className={styles.productImgWrapper}>
  <img src={p.image} alt="" className={styles.productImg} />
</div>


      <div className={styles.productTitle}>{p.name}</div>
      <div className={styles.productPrice}>{fmtMoney(p.price)}</div>

      <div className={styles.productQtyRow}>
        <label className={styles.qtyLabel} htmlFor={`qty-${p.id}`}>Quantity</label>
        <select id={`qty-${p.id}`} className={styles.qtySelect} defaultValue={1}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className={styles.addToOrderBtn}
        onClick={(e) => {
          const qty = Number(
            (e.currentTarget.parentElement.querySelector(`#qty-${p.id}`) || {}).value || 1
          );
          // add to cart if you have addItem available:
          addItem?.(
            {
              id: p.id,
              name: p.name,
              image: p.image,
              price: p.price,
              slug: p.slug,
              category: p.category,
              status: p.status,
              skill: p.skill,
            },
            qty
          );
        }}
      >
        Add to order
      </button>
    </div>
  ))}
</div>


            {/* =======================
                Payment
               ======================= */}
            <h2 className={styles.sectionTitle}>Payment</h2>
            <p className={styles.noteTiny}>All transactions are secure and encrypted.</p>

            {/* Payment method radios */}
            <div className={styles.paymentMethodList} role="radiogroup" aria-label="Payment method">
        <label
  className={`${styles.radioRow} ${
    payMethod === "card" ? styles.radioActive : ""
  }`}
>
  <input
    type="radio"
    name="payMethod"
    value="card"
    checked={payMethod === "card"}
    onChange={() => setPayMethod("card")}
  />
  <span className={styles.radioLabel}>
    Credit card

    {/* Visible brands + “+5” with tooltip */}
    <span
      className={styles.cardBrands}
      onMouseEnter={() => setShowBrandsTip(true)}
      onMouseLeave={() => setShowBrandsTip(false)}
    >
      <img className={styles.brandBadge} src="/assets/Visa.svg" alt="Visa" />
      <img
        className={styles.brandBadge}
        src="/assets/Mastercard.svg"
        alt="Mastercard"
      />
      <img className={styles.brandBadge} src="/assets/Amex.svg" alt="American Express" />

   

      
  
    </span>
  </span>
</label>

              {payMethod === "card" && (
                <div className={styles.cardPanel}>
                  <div className={styles.rowOne}>
                    <div className={styles.float}>
                      <input
                        id="ccNumber"
                        name="ccNumber"
                        inputMode="numeric"
                        placeholder=" "
                        className={styles.hasFloat}
                      />
                      <label htmlFor="ccNumber" className={styles.floatLabel}>
                        Card number
                      </label>
                    </div>
                  </div>

                  <div className={styles.rowTwo}>
                    <div className={styles.float}>
                      <input
                        id="ccExp"
                        name="ccExp"
                        placeholder=" "
                        className={styles.hasFloat}
                      />
                      <label htmlFor="ccExp" className={styles.floatLabel}>
                        Expiration date (MM / YY)
                      </label>
                    </div>
                    <div className={styles.float}>
                      <input
                        id="ccCvc"
                        name="ccCvc"
                        inputMode="numeric"
                        placeholder=" "
                        className={styles.hasFloat}
                      />
                      <label htmlFor="ccCvc" className={styles.floatLabel}>
                        Security code
                      </label>
                    </div>
                  </div>

                  <div className={styles.rowOne}>
                    <div className={styles.float}>
                      <input
                        id="ccName"
                        name="ccName"
                        placeholder=" "
                        className={styles.hasFloat}
                      />
                      <label htmlFor="ccName" className={styles.floatLabel}>
                        Name on card
                      </label>
                    </div>
                  </div>

                  {/* Divider + Express checkout */}
                  <div className={styles.dividerRow}>
                    <span className={styles.dividerLine} />
                    <span className={styles.dividerLabel}>OR</span>
                    <span className={styles.dividerLine} />
                  </div>

                  <div className={styles.sectionBlock}>
                    <div className={styles.expressRow}>
                      <button type="button" className={`${styles.expressBtn1} ${styles.expressApple}`}>
                        <img src="/assets/ApplePay.svg" alt="" />
                        <span></span>
                      </button>
                      <button type="button" className={`${styles.expressBtn2} ${styles.expressPaypal}`}>
                        <img src="/assets/PayPal.svg" alt="" />
                        <span></span>
                      </button>
                      <button type="button" className={`${styles.expressBtn3} ${styles.expressGpay}`}>
                        <img src="/assets/sei_red_and_white.svg" alt="" />
                        <span></span>
                      </button>
                    </div>
                    <p className={styles.noteTiny}>
                      By continuing with your payment, you agree to the future charges listed on this
                      page and the cancellation policy.
                    </p>
                  </div>

                  {/* Billing address */}
                  <label className={styles.checkRow}>
                    <input
                      type="checkbox"
                      checked={useShippingAsBilling}
                      onChange={(e) => setUseShippingAsBilling(e.target.checked)}
                    />
                    <span>Use shipping address as billing address</span>
                  </label>

                  {!useShippingAsBilling && (
                    <>
                      <div className={styles.rowOne}>
                        <div className={styles.float}>
                          <select
                            id="billCountry"
                            name="billCountry"
                            className={styles.hasFloat}
                            defaultValue=""
                          >
                            <option value="" disabled hidden></option>
                            <option value="GB">United Kingdom</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="AU">Australia</option>
                            <option value="EU">European Union</option>
                          </select>
                          <label htmlFor="billCountry" className={styles.floatLabel}>
                            Country/Region
                          </label>
                        </div>
                      </div>

                      <div className={styles.rowTwo}>
                        <div className={styles.float}>
                          <input
                            id="billFirst"
                            placeholder=" "
                            className={styles.hasFloat}
                          />
                          <label htmlFor="billFirst" className={styles.floatLabel}>
                            First name
                          </label>
                        </div>
                        <div className={styles.float}>
                          <input
                            id="billLast"
                            placeholder=" "
                            className={styles.hasFloat}
                          />
                          <label htmlFor="billLast" className={styles.floatLabel}>
                            Last name
                          </label>
                        </div>
                      </div>

                      <div className={styles.rowOne}>
                        <div className={styles.float}>
                          <input
                            id="billAddress1"
                            placeholder=" "
                            className={styles.hasFloat}
                          />
                          <label htmlFor="billAddress1" className={styles.floatLabel}>
                            Address
                          </label>
                        </div>
                      </div>

                      <div className={styles.rowOne}>
                        <div className={styles.float}>
                          <input
                            id="billAddress2"
                            placeholder=" "
                            className={styles.hasFloat}
                          />
                          <label htmlFor="billAddress2" className={styles.floatLabel}>
                            Apartment, suite, etc. (optional)
                          </label>
                        </div>
                      </div>

                      <div className={styles.rowTwo}>
                        <div className={styles.float}>
                          <input
                            id="billCity"
                            placeholder=" "
                            className={styles.hasFloat}
                          />
                          <label htmlFor="billCity" className={styles.floatLabel}>
                            City
                          </label>
                        </div>
                        <div className={styles.float}>
                          <input
                            id="billPost"
                            placeholder=" "
                            className={styles.hasFloat}
                          />
                          <label htmlFor="billPost" className={styles.floatLabel}>
                            Postcode
                          </label>
                        </div>
                      </div>

                      <div className={styles.rowOne}>
                        <div className={styles.float}>
                          <input
                            id="billPhone"
                            placeholder=" "
                            className={styles.hasFloat}
                          />
                          <label htmlFor="billPhone" className={styles.floatLabel}>
                            Phone (optional)
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* =======================
                Save / Secure / Submit
               ======================= */}
            <label className={styles.checkRow}>
              <input type="checkbox" />
              <span>Save my information for a faster checkout</span>
            </label>

            <button type="submit" className={styles.payNowBtn}>Pay now</button>

            <div className={styles.footerLinks}>
              <a href="/" rel="nofollow">Refund policy</a>
              <a href="/" rel="nofollow">Privacy policy</a>
              <a href="/" rel="nofollow">Terms of service</a>
              <a href="/" rel="nofollow">Cancellations</a>
            </div>
          </form>
        </section>

        {/* Right column: shared Order Summary */}
 <OrderSummary
  count={count}
  subtotal={+total.toFixed(2)}
  tax={0}                 // hidden unless you pass showTax
  total={+total.toFixed(2)}
  showCheckoutCta={false}
  shippingPending={true}  // ← shows “Enter shipping address”
  currencySymbol="$"
  currencyCode="USD"
/>

      </div>
    </div>
  );
}

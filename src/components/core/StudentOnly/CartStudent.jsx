import { useState, useCallback, memo } from "react";
import styles from "./CartStudent.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

import {
  removeFromCart,
  applyDiscount,
  applyDiscountPercent,
} from "../../../Reducer/Slices/CartSlice";

import { formatINR } from "../../../services/Oprations/formatCurrency";

export default function CartStudent() {

  const dispatch = useDispatch();

  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");

  const {
    cartItems = [],
    totalItem = 0,
    totalPrice = 0,
    discount = 0,
    finalPrice = 0,
  } = useSelector((state) => state.cart || {});

  const removeItem = useCallback((courseId) => {
    dispatch(removeFromCart(courseId));
  }, [dispatch]);

  const applyPromo = () => {

    const code = promoCode.trim().toUpperCase();

    if (!code) {
      setPromoError("Enter promo code");
      return;
    }

    const promoMap = {
      SAVE500: () => dispatch(applyDiscount(500)),
      SAVE10: () => dispatch(applyDiscountPercent(10)),
      WELCOME: () => dispatch(applyDiscountPercent(15)),
    };

    if (promoMap[code]) {
      promoMap[code]();
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
    }
  };

  const subtotalFormatted = formatINR(totalPrice);
  const discountFormatted = formatINR(discount);
  const finalFormatted = formatINR(finalPrice);

  return (
    <div className={styles.wrapper}>

      <div className={styles.bgGradient}></div>

      <h1 className={styles.title}>My Cart</h1>

      <div className={styles.stats}>
        <StatCard label="Total Courses" value={totalItem} />
        <StatCard label="Subtotal" value={`₹${subtotalFormatted}`} />
        <StatCard label="You Saved" value={`₹${discountFormatted}`} />
      </div>

      {cartItems.length === 0 && (
        <p>Your cart is empty</p>
      )}

      <div className={styles.layout}>

        <div className={styles.cartItems}>

          <AnimatePresence>

            {cartItems.map((item) => (

              <motion.div
                key={item._id}
                className={styles.card}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >

                <div className={styles.left}>

                  <img
                    src={item.thumbnail}
                    alt={item.courseName}
                  />

                  <div>
                    <h3>{item.courseName}</h3>
                    <p>
                      Created by{" "}
                      <span className={styles.instructorName}>
                        {item.instructor}
                      </span>
                    </p>
                  </div>

                </div>

                <div className={styles.right}>

                  <span className={styles.price}>
                    ₹ {formatINR(item.price)}
                  </span>

                  <button
                    className={styles.remove}
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>

                </div>

              </motion.div>

            ))}

          </AnimatePresence>

        </div>

        <div className={styles.summary}>

          <h2>Order Summary</h2>

          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>₹{subtotalFormatted}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Discount</span>
            <span className={styles.discount}>
              - ₹{discountFormatted}
            </span>
          </div>

          <div className={styles.totalRow}>
            <span>Total</span>
            <span>₹{finalFormatted}</span>
          </div>

        </div>

      </div>

    </div>
  );
}

const StatCard = memo(function StatCard({ label, value }) {
  return (
    <motion.div
      className={styles.statCard}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p>{label}</p>
      <h3>{value}</h3>
    </motion.div>
  );
});
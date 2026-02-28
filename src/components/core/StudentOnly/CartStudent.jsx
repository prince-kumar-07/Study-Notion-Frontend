import { useState, useCallback, memo } from "react";
import styles from "./CartStudent.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { buyCourse } from "../../../services/Oprations/Payamnets"
import {useNavigate} from "react-router-dom"

import {
  removeFromCart,
  applyDiscount,
  applyDiscountPercent,
} from "../../../Reducer/Slices/CartSlice";
import { formatINR } from "../../../services/Oprations/formatCurrency";
import toast from "react-hot-toast";

export default function CartStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state.profile?.user || null);
  const { cartItemIds } = useSelector((state) => state.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const {
    cartItems = [],
    totalItem = 0,
    totalPrice = 0,
    discount = 0,
    finalPrice = 0, } = useSelector((state) => state.cart || {});

  const removeItem = useCallback(
    (courseId) => {
      dispatch(removeFromCart(courseId));
    },
    [dispatch]
  );

  const coupons = [
    { code: "SAVE500", desc: "Flat ₹500 Off" },
    { code: "SAVE10", desc: "10% Discount" },
    { code: "WELCOME", desc: "15% Welcome Offer" },
  ];

  const applyCoupon = (code) => {
    const promoMap = {
      SAVE500: () => dispatch(applyDiscount(500)),
      SAVE10: () => dispatch(applyDiscountPercent(10)),
      WELCOME: () => dispatch(applyDiscountPercent(15)),
    };

    if (promoMap[code]) {
      promoMap[code]();
      setIsModalOpen(false);
    }
  };

   function handleBuyCourses(){
     
      if(!user && !cartItemIds){
        toast.error("user or course data not available")
       return
      }

      buyCourse(cartItemIds, user, navigate, dispatch)
    }

  const subtotalFormatted = formatINR(totalPrice);
  const discountFormatted = formatINR(discount);
  const finalFormatted = formatINR(finalPrice);
 

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>My Cart</h1>

      {/* Stats */}
      <div className={styles.stats}>
        <StatCard label="Total Courses" value={totalItem} />
        <StatCard label="Subtotal" value={`₹${subtotalFormatted}`} />
        <StatCard label="You Saved" value={`₹${discountFormatted}`} />
      </div>

      {cartItems.length === 0 && (
        <p className={styles.emptyText}>Your cart is empty</p>
      )}

      <div className={styles.layout}>
        {/* Cart Items */}
        <div className={styles.cartItems}>
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item._id}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className={styles.left}>
                  <img src={item.thumbnail} alt={item.courseName} />
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

        {/* Summary */}
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

          {/* View Coupons Button */}
          <button
            className={styles.couponBtn}
            onClick={() => setIsModalOpen(true)}
          >
            View All Coupons
          </button>

          {/* Checkout */}
          <motion.button
            className={styles.checkout}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleBuyCourses()}
          >
            Proceed to Checkout • ₹{finalFormatted}
          </motion.button>
        </div>
      </div>

      {/* Coupon Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2>Available Coupons</h2>

              {coupons.map((coupon) => (
                <div key={coupon.code} className={styles.couponCard}>
                  <div>
                    <h4>{coupon.code}</h4>
                    <p>{coupon.desc}</p>
                  </div>
                  <button
                    onClick={() => applyCoupon(coupon.code)}
                  >
                    Apply
                  </button>
                </div>
              ))}

              <button
                className={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const StatCard = memo(function StatCard({ label, value }) {
  return (
    <motion.div
      className={styles.statCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p>{label}</p>
      <h3>{value}</h3>
    </motion.div>
  );
});
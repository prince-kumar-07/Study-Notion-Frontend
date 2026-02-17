import React, { useState } from "react";
import styles from "./CartStudent.module.css";
import { motion, AnimatePresence } from "framer-motion";

const initialCart = [
  {
    id: 1,
    title: "Complete Python Bootcamp",
    instructor: "John Doe",
    price: 1999,
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
  },
  {
    id: 2,
    title: "React Mastery",
    instructor: "Jane Smith",
    price: 2499,
    thumbnail:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=500",
  },
];

export default function CartStudent() {
  const [cart, setCart] = useState(initialCart);

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const discount = 500;
  const total = subtotal - discount;

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.bgGradient}></div>

      <h1 className={styles.title}>My Cart</h1>

      {/* Top Stats */}
      <div className={styles.stats}>
        <StatCard label="Total Courses" value={cart.length} />
        <StatCard label="Subtotal" value={`₹${subtotal}`} />
        <StatCard label="You Saved" value={`₹${discount}`} />
      </div>

      <div className={styles.layout}>
        {/* Cart Items */}
        <div className={styles.cartItems}>
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                className={styles.card}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.left}>
                  <img src={item.thumbnail} alt="" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.instructor}</p>
                  </div>
                </div>

                <div className={styles.right}>
                  <span className={styles.price}>₹{item.price}</span>
                  <button
                    className={styles.remove}
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className={styles.summary}>
          <h2>Order Summary</h2>

          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Discount</span>
            <span className={styles.discount}>- ₹{discount}</span>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.totalRow}>
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <motion.button
            className={styles.checkout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Proceed to Checkout
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
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
}

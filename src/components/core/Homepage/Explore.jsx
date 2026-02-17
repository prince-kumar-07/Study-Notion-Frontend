import { useState } from "react";
import styles from "./Explore.module.css";
import { HomePageExplore } from "../../../../data/homepage-explore";
import Card from "./Card";

export default function Explore() {
  const tabsName = [
    { id: 1, name: "Free" },
    { id: 2, name: "New to Coding" },
    { id: 3, name: "Most Popular" },
    { id: 4, name: "Skill Paths" },
    { id: 5, name: "Career paths" },
  ];

  const [activeTab, setActiveTab] = useState(tabsName[0].name);

  const selectedCourses =
    HomePageExplore.find((course) => course.tag === activeTab)?.courses || [];

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>Unlock the Power of Code</h2>
      <p className={styles.subtext}>
        Learn to build anything you can imagine with our comprehensive coding
        courses.
      </p>

      {/* Tabs */}
      <div className={styles.tabs}>
        {tabsName.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabBtn} ${
              activeTab === tab.name ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className={styles.cardGrid}>
        {selectedCourses.map((course, index) => (
          <Card key={index} cardData={course} />
        ))}
      </div>
    </section>
  );
}

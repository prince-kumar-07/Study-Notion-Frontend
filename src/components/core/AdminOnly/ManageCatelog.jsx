import { useState } from "react";
import styles from "./ManageCatelog.module.css";
import { VscShield } from "react-icons/vsc";
import { createCategory } from "../../../services/Oprations/Category";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function ManageCatalog() {

  const { allCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [showAll, setShowAll] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleCreate = () => {
    if (!formData.name || !formData.description){
      toast.error("Name & Description is required")
      return
    }
    createCategory(dispatch, { name: formData.name, description: formData.description })
    setFormData({ name: "", description: "" })
  }

  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description, id:category._id });
    setModalOpen(true);
  };

  const handleUpdate = () => {
   
    setModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Manage Catalog</h1>
        <div className={styles.securityBadge}>
                           <VscShield />
                           <span>Admin Access Only</span>
                         </div>
      </div>

      
      <div className={styles.card}>
        <h2>Create Category</h2>
        <div className={styles.formGrid}>
          <input
            type="text"
            placeholder="Category Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <textarea
            placeholder="Category Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <button className={styles.primaryBtn} onClick={handleCreate}>
          Create Category
        </button>
      </div>

     
      <div className={styles.showAllSection}>
        <button
          className={styles.secondaryBtn}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Hide Categories" : "Show All Categories"}
        </button>
      </div>

    
      {showAll && (
        <div className={styles.grid}>
          {allCategory?.map((cat) => (
            <div key={cat._id} className={styles.categoryCard}>
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
              <button
                className={styles.editBtn}
                onClick={() => openEditModal(cat)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

   
      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit Category</h2>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <div className={styles.modalActions}>
              <button
                className={styles.primaryBtn}
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                className={styles.secondaryBtn}
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


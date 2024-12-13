import React from "react";
import styles from "./NutritionForm.module.css";


const NutritionForm = ({ nutrition, onNutritionChange }) => {
  const handleChange = (e) => {
    const {name, value} = e.target;
    
     console.log(name, value);
    onNutritionChange(name, value ? Number(value) : null);
  };

  return (
    <div className={styles.nutritionForm}>
      <h3>Nutrition Information</h3>
      <div className={styles.formGroup}>
        <label htmlFor="calories">Calories</label>
        <input
          type="number"
          id="calories"
          name="calories"
          value={nutrition?.calories || ""}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="protein">Protein (g)</label>
        <input
          type="number"
          id="protein"
          name="protein"
          value={nutrition?.protein || ""}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="fat">Fat (g)</label>
        <input
          type="number"
          id="fat"
          name="fat"
          value={nutrition?.fat || ""}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="carbs">Carbohydrates (g)</label>
        <input
          type="number"
          id="carbs"
          name="carbs"
          value={nutrition?.carbs || ""}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="fiber">Fiber (g)</label>
        <input
          type="number"
          id="fiber"
          name="fiber"
          value={nutrition?.fiber || ""}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="sugar">Sugar (g)</label>
        <input
          type="number"
          id="sugar"
          name="sugar"
          value={nutrition?.sugar || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default NutritionForm;

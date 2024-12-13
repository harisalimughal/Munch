import React, { useState } from "react";
import axios from "axios";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import styles from "./RecipeForm.module.css";
import NutritionForm from "../NutritionForm/NutritionForm";

const RecipeForm = ({ initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
      ingredients: [],
      instructions: "",
      cookingTime: "",
      servings: "",
      difficulty: "easy",
      categories: [],
      tags: [],
      images: [],
      nutrition: null,
    }
  );
  const [pic, setPic] = useState("");
  const [message, setMessage] = useState("");
  const [picMessage, setPicMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading]= useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showNutritionFields, setShowNutritionFields] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleNutritionChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      nutrition: {
        ...prevData.nutrition,
        [name]: value, // Dynamically update nutrition fields
      },
    }));
  };

  const handleInstructionsChange = (content) => {
    setFormData((prevData) => ({ ...prevData, instructions: content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      const { data } = await axios.post(
        "/api/recipes/create",
        {
          ...formData,
          image: pic, // Pass the Cloudinary URL as the image
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Recipe created:", data);
      setSuccess(true);
      setFormData({
        title: "",
        description: "",
        ingredients: [],
        instructions: "",
        cookingTime: "",
        servings: "",
        difficulty: "easy",
        categories: [],
        tags: [],
        images: [],
        nutrition: null,
      });
      setPic(""); // Reset to default image
    } catch (err) {
      console.error("Error creating recipe:", err.message);
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setFormLoading(false);
    }
  };

  const postDetails = async (pics) => {
    if (!pics) {
      setMessage("Please Select an Image");
      return;
    }
    setPicMessage(null);

    // Add a loading state
    setLoading(true);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      try {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "harismunch");
        data.append("cloud_name", "harismunch");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/harismunch/image/upload",
          {
            method: "post",
            body: data,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const cloudinaryData = await response.json();
        console.log("Cloudinary response:", cloudinaryData);
        setPic(cloudinaryData.url.toString());
      } catch (error) {
        console.error("Upload error:", error);
        setPicMessage("Image upload failed");
      } finally {
        setLoading(false); // Reset loading state
      }
    } else {
      setPicMessage("Please Select an Image");
      setLoading(false); // Reset loading state if unsupported file type
    }
  };


  return (
    <form onSubmit={handleSubmit} className={styles.recipeForm}>
      <h2>Add New Recipe</h2>

      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="ingredients">Ingredients (comma-separated)</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={formData.ingredients.join(", ")}
          onChange={handleArrayChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="instructions">Instructions</label>
        <RichTextEditor
          value={formData.instructions}
          onChange={handleInstructionsChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={formData.cookingTime}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="servings">Servings</label>
        <input
          type="number"
          id="servings"
          name="servings"
          value={formData.servings}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          required
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="categories">Categories (comma-separated)</label>
        <input
          type="text"
          id="categories"
          name="categories"
          value={formData.categories.join(", ")}
          onChange={handleArrayChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags.join(", ")}
          onChange={handleArrayChange}
        />
      </div>
      <button
        type="button"
        onClick={() => setShowNutritionFields(!showNutritionFields)}
        className={styles.toggleButton}
      >
        {showNutritionFields
          ? "Hide Nutrition Information"
          : "Add Nutrition Information"}
      </button>
      {showNutritionFields && (
        <NutritionForm
          nutrition={formData.nutrition}
          onNutritionChange={handleNutritionChange}
        />
      )}
      <div className={styles.formGroup}>
        <label htmlFor="pic">Recipe Image</label>
        <input
          type="file"
          id="pic"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
        {loading && <p>Uploading image, please wait...</p>}
        {pic && (
          <div className={styles.imagePreview}>
            <img src={pic} alt="Uploaded Preview" />
          </div>
        )}
      </div>

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {formLoading ? "Submitting..." : "Submit Recipe"}
      </button>
      {error && <div className={styles.error}>{error}</div>}
      {success && (
        <div className={styles.success}>Recipe added successfully!</div>
      )}
    </form>
  );
};

export default RecipeForm;

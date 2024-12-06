import React, { useState } from 'react';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import ImageUploader from '../ImageUploader/ImageUploader';
import CategoryTag from '../CategoryTag/CategoryTag';
import styles from './RecipeForm.module.css';

const RecipeForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    ingredients: [],
    instructions: '',
    cookingTime: '',
    servings: '',
    difficulty: 'easy',
    categories: [],
    tags: [],
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value.split(',').map(item => item.trim()) }));
  };

  const handleInstructionsChange = (content) => {
    setFormData((prevData) => ({ ...prevData, instructions: content }));
  };

  const handleImageUpload = (images) => {
    setFormData((prevData) => ({ ...prevData, images }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
          value={formData.ingredients.join(', ')}
          onChange={handleArrayChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="instructions">Instructions</label>
        <RichTextEditor value={formData.instructions} onChange={handleInstructionsChange} />
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
          value={formData.categories.join(', ')}
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
          value={formData.tags.join(', ')}
          onChange={handleArrayChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Images</label>
        <ImageUploader onUpload={handleImageUpload} />
      </div>
      <button type="submit" className={styles.submitButton}>
        Submit Recipe
      </button>
    </form>
  );
};

export default RecipeForm;


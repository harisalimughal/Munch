import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import Home from './features/Home/Home';
import RecipeList from './features/RecipeList/RecipeList';
import RecipeDetail from './features/Recipe/RecipeDetail';
import Login from './features/Auth/Login';
import Register from './features/Auth/Register';
import AddRecipe from './features/Recipe/AddRecipe';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MealPlanner from './features/MealPlanner/MealPlanner';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/meal-planner" element={<MealPlanner />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route
              path="/add-recipe"
              element={
                <ProtectedRoute>
                  <AddRecipe />
                </ProtectedRoute>
              }
            />
            <Route
              path="/meal-planner"
              element={
                <ProtectedRoute>
                  <MealPlanner />
                  <div>Add Recipe</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;


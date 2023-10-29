import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ShoppingListPage from "./pages/shopping_list/shoppinglist";
import Layout from "./pages/layout/layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/shoppingList" element={<ShoppingListPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

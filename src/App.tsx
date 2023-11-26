import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ShoppingListPage from "./pages/shopping_list/shoppinglist";
import ShoppingListOverview from "./pages/shopping_list_overview/shoppingListOverview";
import Layout from "./pages/layout/layout";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/shoppingList/:id" element={<ShoppingListPage />} />
              <Route path="" element={<ShoppingListOverview />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ShoppingListPage from "./pages/shopping_list/shoppinglist";
import ShoppingListOverview from "./pages/shopping_list_overview/shoppingListOverview";
import Layout from "./pages/layout/layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { Flowbite } from "flowbite-react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./translations/translations.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translations.en,
    },
    cs: {
      translation: translations.cs,
    },
  },
  supportedLngs: ["en", "cs"],
  lng: "cs",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <Flowbite>
      <QueryClientProvider client={queryClient}>
        <div className="App dark:bg-gray-700">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route
                  path="/shoppingList/:id"
                  element={<ShoppingListPage />}
                />
                <Route path="" element={<ShoppingListOverview />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </QueryClientProvider>
    </Flowbite>
  );
}

export default App;

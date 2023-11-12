import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ShoppingListPage from "./pages/shopping_list/shoppinglist";
import ShoppingListOverview from "./pages/shopping_list_overview/shoppingListOverview";
import Layout from "./pages/layout/layout";
import { useState } from "react";

const defaultShoppingList = [
  {
    id: 1,
    name: "My second beuatiful shopping list",
    author: "John Doe",
    ownerId: 1,
    items: [
      {
        name: "Milk",
        resolved: false,
      },
      {
        name: "Eggs",
        resolved: true,
      },
      {
        name: "Bread",
        resolved: false,
      },
      {
        name: "Butter",
        resolved: true,
      },
      {
        name: "Cheese",
        resolved: false,
      },
    ],
    users: [
      {
        id: 1,
        name: "John Doe",
        role: "Author",
      },
      {
        id: 2,
        name: "Jane Doe",
        role: "User",
      },
      {
        id: 3,
        name: "John Smith",
        role: "User",
      },
    ],
  },
  {
    id: 2,
    name: "My not beautiful shopping list",
    author: "John John",
    ownerId: 4,
    items: [
      {
        name: "Milk",
        resolved: false,
      },
      {
        name: "Eggs",
        resolved: true,
      },
      {
        name: "Bread",
        resolved: false,
      },
      {
        name: "Butter",
        resolved: true,
      },
      {
        name: "Cheese",
        resolved: false,
      },
    ],
    users: [
      {
        id: 4,
        name: "John John",
        role: "Author",
      },
      {
        id: 5,
        name: "Jane Doe",
        role: "User",
      },
      {
        id: 6,
        name: "John Smith",
        role: "User",
      },
    ],
  },
  {
    id: 3,
    name: "Random shopping list",
    author: "Pepa z Depa",
    ownerId: 7,
    items: [
      {
        name: "Milk",
        resolved: false,
      },
      {
        name: "Eggs",
        resolved: true,
      },
      {
        name: "Bread",
        resolved: false,
      },
      {
        name: "Butter",
        resolved: true,
      },
      {
        name: "Cheese",
        resolved: false,
      },
    ],
    users: [
      {
        id: 7,
        name: "Pepa z Depa",
        role: "Author",
      },
      {
        id: 8,
        name: "Jane Doe",
        role: "User",
      },
      {
        id: 9,
        name: "John Smith",
        role: "User",
      },
    ],
  },
  {
    id: 4,
    name: "My beautiful shopping list",
    author: "Jan Novak",
    ownerId: 10,
    items: [
      {
        name: "Milk",
        resolved: false,
      },
      {
        name: "Eggs",
        resolved: true,
      },
      {
        name: "Bread",
        resolved: false,
      },
      {
        name: "Butter",
        resolved: true,
      },
      {
        name: "Cheese",
        resolved: false,
      },
    ],
    users: [
      {
        id: 10,
        name: "Jan Novak",
        role: "Author",
      },
      {
        id: 11,
        name: "Jane Doe",
        role: "User",
      },
      {
        id: 12,
        name: "John Smith",
        role: "User",
      },
    ],
  },
];

function App() {
  const [shoppingLists, setShoppingLists] = useState(defaultShoppingList);
  const shoppingListState = {
    shoppingLists,
    setShoppingLists,
  };

  const randomUser = [
    { id: 1, name: "John Doe" },
    { id: 4, name: "John John" },
    { id: 7, name: "Pepa z Depa" },
    { id: 10, name: "Jan Novak" },
  ].at(Math.floor(Math.random() * 4));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout currentUser={randomUser} />}>
            <Route
              path="/shoppingList/:id"
              element={<ShoppingListPage shoppingLists={shoppingListState} />}
            />
            <Route
              path=""
              element={
                <ShoppingListOverview
                  shoppingLists={shoppingListState}
                  userId={randomUser.id}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

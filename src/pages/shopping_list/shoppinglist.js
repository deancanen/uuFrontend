import ShoppingList from "../../components/shopping_list/ShoppingList";
import ShoppingListUsers from "../../components/shopping_list_users/ShoppingListUsers";

const shoppingList = {
  name: "My beautiful shopping list",
  author: "John Doe",
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
};

function ShoppingListPage() {
  const currentUser = shoppingList.users[Math.floor(Math.random() * 3)];

  return (
    <>
      <ShoppingList shoppingList={shoppingList} currentUser={currentUser} />
      <ShoppingListUsers
        shoppingList={shoppingList}
        currentUser={currentUser}
      />
    </>
  );
}

export default ShoppingListPage;

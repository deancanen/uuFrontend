import { useParams } from "react-router-dom";
import ShoppingList from "../../components/shopping_list/ShoppingList";
import ShoppingListUsers from "../../components/shopping_list_users/ShoppingListUsers";

function ShoppingListPage(props) {
  const { shoppingLists, setShoppingLists } = props.shoppingLists;
  const { id } = useParams();
  const shoppingList = shoppingLists.find((list) => list.id === Number(id));

  if (!shoppingList)
    return (
      <h1 className="text-center mt-4 mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Shopping list with id '{id}' not found
      </h1>
    );

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

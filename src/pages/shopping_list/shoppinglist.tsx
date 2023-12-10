import { useOutlet, useOutletContext, useParams } from "react-router-dom";
import ShoppingListUsers from "../../components/shopping_list_users/ShoppingListUsers";
import { API } from "../../service/restService";
import { useQuery } from "react-query";
import { OutletContext } from "../layout/layout";
import ShoppingList from "../../components/shopping_list/ShoppingList";
import { useTranslation } from "react-i18next";

async function getShoppingList(id: string) {
  const res = await API.get(`/shoppingLists/${id}`);
  return res.data;
}

function ShoppingListPage() {
  const { id } = useParams();

  const { t } = useTranslation();

  const currentUser = useOutletContext<OutletContext>().user;

  const {
    isLoading,
    error,
    data: shoppingList,
  } = useQuery(["shoppingList", id], () => getShoppingList(id as string));

  if (error)
    return (
      <h1 className="text-center mt-4 mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {t("Shopping list with id", { id })}
      </h1>
    );

  return (
    shoppingList && (
      <>
        <ShoppingList shoppingList={shoppingList} />
        <ShoppingListUsers
          shoppingList={shoppingList}
          currentUser={currentUser}
        />
      </>
    )
  );
}

export default ShoppingListPage;

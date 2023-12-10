import { Button, Modal, TextInput, Toast } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  Role,
  ShoppingListItems,
  ShoppingListUsers,
} from "../../interfaces/ShoppingList";
import { API } from "../../service/restService";
import { useMutation } from "react-query";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../../pages/layout/layout";
import { useTranslation } from "react-i18next";

interface AddNewListRequest {
  name: string;
  author: string;
  items: ShoppingListItems[];
  users: ShoppingListUsers[];
}

interface FormElements extends HTMLFormControlsCollection {
  shopping_list_name: HTMLInputElement;
}
interface InputFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

async function addNewShoppingList(shoppingList: AddNewListRequest) {
  const res = await API.post("/shoppingLists/create", shoppingList);
  return res.data;
}

function AddNewListModal() {
  const [addNewShoppingListModal, setAddNewShoppingListModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { t } = useTranslation();

  const addListMutation = useMutation(addNewShoppingList, {
    onSuccess: () => {
      console.log("Added");
    },
  });

  const handleAddList = (shoppingList: AddNewListRequest) => {
    try {
      addListMutation.mutateAsync(shoppingList);
    } catch (e) {
      console.error(e);
    }
  };

  const currentUser = useOutletContext<OutletContext>().user;

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [showToast]);

  const onAddNewShoppingList = (e: React.FormEvent<InputFormElement>) => {
    e.preventDefault();
    const shoppingListName = e.currentTarget.elements.shopping_list_name.value;
    const newShoppingList: AddNewListRequest = {
      name: shoppingListName,
      author: currentUser.user.name,
      items: [],
      users: [
        {
          id: currentUser.user.id,
          name: currentUser.user.name,
          role: Role.OWNER,
        },
      ],
    };
    handleAddList(newShoppingList);
    setAddNewShoppingListModal(false);
    setShowToast(true);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <Button
        gradientDuoTone="pinkToOrange"
        onClick={(_) => setAddNewShoppingListModal(true)}
      >
        {t("Add new shopping list")}
      </Button>
      <Modal
        dismissible
        show={addNewShoppingListModal}
        onClose={() => setAddNewShoppingListModal(false)}
      >
        <Modal.Header>{t("Add new shopping list")}</Modal.Header>
        <Modal.Body>
          <div className="inline-flex space-x-4">
            <form onSubmit={onAddNewShoppingList}>
              <label
                htmlFor="shopping_list_name"
                className="block mb-2 font-bold text-gray-900 dark:text-white"
              >
                {t("Shopping list name")}
              </label>
              <div className="inline-flex space-x-2">
                <TextInput
                  type="text"
                  id="shopping_list_name"
                  className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Shopping list name"
                />
                <Button outline pill type="submit">
                  {t("Save")}
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      {showToast && (
        <Toast>{t("Shopping list was successfully created")}.</Toast>
      )}
    </div>
  );
}

export default AddNewListModal;

import { Button, Modal, TextInput, Toast } from "flowbite-react";
import { useEffect, useState } from "react";

function AddNewListModal(props) {
  const [addNewShoppingListModal, setAddNewShoppingListModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { shoppingLists, setShoppingLists } = props.shoppingLists;
  const current_user = [
    { id: 1, name: "Jan Novak" },
    { id: 2, name: "Petr Novak" },
    { id: 3, name: "Karel Novak" },
  ].at(Math.floor(Math.random() * 3));

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [showToast]);

  const onAddNewShoppingList = (e) => {
    e.preventDefault();
    const shoppingListName = e.target.elements.shopping_list_name.value;
    const newShoppingList = {
      id: Math.floor(Math.random() * 1000) + 10,
      name: shoppingListName,
      author: current_user.name,
      items: [],
      users: [
        {
          id: current_user.id,
          name: current_user.name,
          role: "Author",
        },
      ],
    };
    setShoppingLists([...shoppingLists, newShoppingList]);
    setAddNewShoppingListModal(false);
    setShowToast(true);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <Button
        gradientDuoTone="pinkToOrange"
        onClick={(_) => setAddNewShoppingListModal(true)}
      >
        Add new shopping list
      </Button>
      <Modal
        dismissible
        show={addNewShoppingListModal}
        onClose={(_) => setAddNewShoppingListModal(false)}
      >
        <Modal.Header>Add new shopping list</Modal.Header>
        <Modal.Body>
          <div className="inline-flex space-x-4">
            <form onSubmit={onAddNewShoppingList}>
              <label
                htmlFor="shopping_list_name"
                className="block mb-2 font-bold text-gray-900 dark:text-white"
              >
                Shopping list name
              </label>
              <div className="inline-flex space-x-2">
                <TextInput
                  type="text"
                  id="shopping_list_name"
                  className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Shopping list name"
                />
                <Button outline pill type="submit">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      {showToast && <Toast text="Shopping list was successfully created." />}
    </div>
  );
}

export default AddNewListModal;

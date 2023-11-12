import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Card, Dropdown, Modal } from "flowbite-react";
import AddNewListModal from "../../components/add_new_list_modal/AddNewListModal";

function ShoppingListOverview(props) {
  const { shoppingLists, setShoppingLists } = props.shoppingLists;

  const [openModal, setOpenModal] = useState(false);
  const [deleteList, setDeleteList] = useState(null);

  return (
    <>
      <div className="mt-6 grid md:grid-cols-3 auto-rows-min content-center mx-12 gap-y-6 gap-x-9">
        {shoppingLists.map((shoppingList) => {
          return (
            <Card key={shoppingList.id} className="min-h-full max-w">
              <div className="flex justify-end px-4 pt-4">
                <Dropdown inline label="">
                  {shoppingList.ownerId === props.userId ? (
                    (console.log(shoppingList.ownerId),
                    (
                      <Dropdown.Item>
                        <a
                          onClick={() => {
                            setOpenModal(true);
                            setDeleteList(shoppingList.id);
                          }}
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Delete list
                        </a>
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item>
                      <a className="cursor-not-allowed block px-4 py-2 text-sm text-gray-500 bg-slate-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
                        Delete list
                      </a>
                    </Dropdown.Item>
                  )}
                </Dropdown>
              </div>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {shoppingList.name}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Author: {shoppingList.author}
              </p>
              <div className="align-bottom">
                <NavLink to={"/shoppingList/" + shoppingList.id}>
                  <Button>
                    View shopping list
                    <svg
                      className="-mr-1 ml-2 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </NavLink>
              </div>
            </Card>
          );
        })}
      </div>
      <AddNewListModal shoppingLists={props.shoppingLists} />

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Are you sure you want to delete this list?</Modal.Header>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShoppingLists(
                shoppingLists.filter(
                  (shoppingList) => shoppingList.id !== deleteList
                )
              );
              setDeleteList(null);
              setOpenModal(false);
            }}
          >
            Delete
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShoppingListOverview;

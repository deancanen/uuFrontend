import { useState, useRef } from "react";
import { Button, Select, TextInput } from "flowbite-react";

function ShoppingList(props) {
  const { shoppingList, setShoppingList } = props;
  const [shoppingListItems, setShoppingListItems] = useState(
    shoppingList.items
  );

  const [shoppingListName, setShoppingListName] = useState(shoppingList.name);

  const inputRef = useRef();

  const [editMode, setEditMode] = useState(false);

  const [newItemMode, setNewItemMode] = useState(false);
  const [newItemName, setNewItemName] = useState("New Item");

  const handleEditChange = (e) => {
    e.preventDefault();
    setShoppingListName(inputRef.current.value || shoppingListName);
    setEditMode(false);
  };

  const [shoppingListFilter, setShoppingListFilter] = useState("all");

  return (
    { shoppingList } && (
      <div className="mt-6 mx-20 block">
        <div className="grid grid-cols-2">
          {editMode ? (
            <>
              <div className="inline-flex space-x-4">
                <form onSubmit={handleEditChange}>
                  <label
                    for="shopping_list_name"
                    class="block mb-2 font-bold text-gray-900 dark:text-white"
                  >
                    Edit shopping list name
                  </label>
                  <div className="inline-flex space-x-2">
                    <TextInput
                      type="text"
                      ref={inputRef}
                      id="shopping_list_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={shoppingListName}
                    />
                    <Button outline pill type="submit">
                      Save
                    </Button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="inline-flex space-x-4">
                <h1 className="text-3xl font-extrabold underline text-black dark:text-white">
                  {shoppingListName}
                </h1>
                {props.currentUser.role === "Author" && (
                  <Button outline pill onClick={(_) => setEditMode(true)}>
                    <svg
                      className="w-[16px] h-[16px] black dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                      <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                    </svg>
                  </Button>
                )}
              </div>
            </>
          )}
          <div>
            <Select
              required
              onChange={(e) => setShoppingListFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="resolved">Resolved</option>
              <option value="unresolved">Unresolved</option>
            </Select>
          </div>
        </div>

        <ul className="divide-y divide-gray-200">
          {shoppingListItems
            .filter((item) => {
              if (shoppingListFilter === "all") {
                return true;
              } else if (shoppingListFilter === "resolved") {
                return item.resolved;
              } else if (shoppingListFilter === "unresolved") {
                return !item.resolved;
              }
              return false;
            })
            .map((item) => (
              <li key={item.name} className="py-4">
                <div className="ml-3 grid md:grid-cols-2 justify-between">
                  <div className="col-span-1 gap-y-3 mb-1 sm:mb-0">
                    <p className="text-xl font-bold text-black">{item.name}</p>
                    <p className="text-sm font-medium text-gray-900">
                      {item.resolved ? "Resolved ✅" : "Unresolved ❌"}
                    </p>
                  </div>

                  <div className="col-span-1 flex gap-x-3 mb-1 text-sm font-medium justify-end">
                    <Button
                      color="failure"
                      className="md:w-1/2"
                      onClick={() => {
                        setShoppingListItems(
                          shoppingListItems.filter((i) => i.name !== item.name)
                        );
                      }}
                    >
                      Remove from list
                    </Button>

                    {item.resolved ? (
                      <Button
                        color="warning"
                        className="md:w-1/2"
                        onClick={() => {
                          setShoppingListItems(
                            shoppingListItems.map((i) => {
                              if (i.name === item.name) {
                                i.resolved = false;
                              }
                              return i;
                            })
                          );
                        }}
                      >
                        Set as unresolved
                      </Button>
                    ) : (
                      <Button
                        color="success"
                        className="md:w-1/2"
                        onClick={() => {
                          setShoppingListItems(
                            shoppingListItems.map((i) => {
                              if (i.name === item.name) {
                                i.resolved = true;
                              }
                              return i;
                            })
                          );
                        }}
                      >
                        Set as resolved
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            ))}

          {newItemMode && (
            <li key="new_item" className="py-4 backdrop-brightness-90">
              <form
                onSubmit={() => {
                  setShoppingListItems([
                    ...shoppingListItems,
                    {
                      name: newItemName,
                      resolved: false,
                    },
                  ]);
                  setNewItemMode(false);
                }}
              >
                <div className="ml-3 grid md:grid-cols-2 justify-between">
                  <div className="col-span-1 gap-y-3 mb-1 sm:mb-0">
                    <TextInput
                      required
                      placeholder="Name of the item"
                      onChange={(e) => setNewItemName(e.target.value)}
                    />
                  </div>

                  <div className="col-span-1 flex gap-x-3 mb-1 text-sm font-medium justify-end">
                    <Button color="success" className="md:w-1/2" type="submit">
                      Add to list
                    </Button>
                    <Button
                      color="failure"
                      className="md:w-1/2"
                      onClick={() => setNewItemMode(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            </li>
          )}
        </ul>
        {!newItemMode && (
          <Button
            color="blue"
            className="mt-4"
            onClick={(_) => setNewItemMode(true)}
          >
            Add new item
          </Button>
        )}
      </div>
    )
  );
}

export default ShoppingList;

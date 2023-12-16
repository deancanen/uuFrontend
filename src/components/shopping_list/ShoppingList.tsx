import { useState, useRef, useEffect } from "react";
import { Button, Select, TextInput } from "flowbite-react";
import { IShoppingList } from "../../interfaces/ShoppingList";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../../pages/layout/layout";
import { API } from "../../service/restService";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import Chart from "react-apexcharts";

interface ShoppingListProps {
  shoppingList: IShoppingList;
}

async function updateShoppingList(shoppingList: IShoppingList) {
  const res = await API.post(`/shoppingLists/${shoppingList.id}`, shoppingList);
  return res.data;
}

function ShoppingList(props: ShoppingListProps) {
  const { shoppingList } = props;
  const [shoppingListItems, setShoppingListItems] = useState(
    shoppingList?.items
  );

  const { t } = useTranslation();

  const [shoppingListName, setShoppingListName] = useState(shoppingList?.name);

  const updateShoppingListMutation = useMutation(updateShoppingList, {
    onSuccess: () => {
      console.log(`Updated shopping list ${shoppingList.id}`);
    },
  });

  useEffect(() => {
    updateShoppingListMutation.mutate({
      ...shoppingList,
      items: shoppingListItems,
      name: shoppingListName,
    });
  }, [shoppingListItems, shoppingListName]);

  const currentUser = useOutletContext<OutletContext>().user;

  const isAuthor = props.shoppingList?.ownerId === currentUser?.user.id;

  const inputRef = useRef<HTMLInputElement>(null);

  const [editMode, setEditMode] = useState(false);

  const [newItemMode, setNewItemMode] = useState(false);
  const [newItemName, setNewItemName] = useState("New Item");

  const handleEditChange = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShoppingListName(inputRef.current?.value || shoppingListName);
    setEditMode(false);
  };

  const [shoppingListFilter, setShoppingListFilter] = useState("all");

  return (
    { shoppingList } && (
      <div className="mt-6 mx-14 md:mx-20 block">
        <div className="grid grid-cols-1 md:grid-cols-2 space-y-4">
          {editMode ? (
            <>
              <div className="inline-flex space-x-4">
                <form onSubmit={handleEditChange}>
                  <label
                    htmlFor="shopping_list_name"
                    className="block mb-2 font-bold text-gray-900 dark:text-white"
                  >
                    {t("Edit shopping list name")}
                  </label>
                  <div className="inline-flex space-x-2">
                    <TextInput
                      type="text"
                      ref={inputRef}
                      id="shopping_list_name"
                      placeholder={shoppingListName}
                    />
                    <Button outline pill type="submit">
                      {t("Save")}
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
                {isAuthor && (
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
              <option value="all">{t("All")}</option>
              <option value="resolved">{t("Resolved")}</option>
              <option value="unresolved">{t("Unresolved")}</option>
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
                    <p className="text-xl font-bold text-black dark:text-gray-200">
                      {item.name}
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-400">
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
                      {t("Remove from list")}
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
                        {t("Set as unresolved")}
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
                        {t("Set as resolved")}
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
                      {t("Add to list")}
                    </Button>
                    <Button
                      color="failure"
                      className="md:w-1/2"
                      onClick={() => setNewItemMode(false)}
                    >
                      {t("Cancel")}
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
            {t("Add new item")}
          </Button>
        )}
        <div className="content-center">
          <Chart
            options={{
              chart: {
                id: "piechart",
                type: "pie",
              },
              labels: ["Resolved", "Unresolved"],
            }}
            series={[
              shoppingListItems.filter((i) => i.resolved).length,
              shoppingListItems.filter((i) => !i.resolved).length,
            ]}
            type="pie"
            width="380"
          />
        </div>
      </div>
    )
  );
}

export default ShoppingList;

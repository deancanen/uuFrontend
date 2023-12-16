import { useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import { Button, Card, Dropdown, Modal } from "flowbite-react";
import AddNewListModal from "../../components/add_new_list_modal/AddNewListModal";
import { API } from "../../service/restService";
import { useQuery, useMutation } from "react-query";
import { IShoppingList } from "../../interfaces/ShoppingList";
import { OutletContext } from "../layout/layout";
import { useTranslation } from "react-i18next";
import Chart from "react-apexcharts";

async function getShoppingLists() {
  const res = await API.get("/shoppingLists");
  return res.data;
}

async function deleteShoppingList(id: number) {
  const res = await API.delete(`/shoppingLists/${id}`);
  return res.data;
}

function ShoppingListOverview() {
  const [openModal, setOpenModal] = useState(false);
  const [deleteList, setDeleteList] = useState<number | null>(null);

  const { t } = useTranslation();

  const { data, isLoading, error } = useQuery(
    "shoppingLists",
    getShoppingLists
  );

  const deleteMutation = useMutation(deleteShoppingList, {
    onSuccess: () => {
      console.log("Deleted");
    },
  });

  const handleDelete = (id: number) => {
    try {
      deleteMutation.mutateAsync(id);
    } catch (e) {
      console.error(e);
    }
  };

  const currentUser = useOutletContext<OutletContext>().user;

  return (
    <>
      <div className="mt-6 grid md:grid-cols-3 auto-rows-min content-center mx-12 gap-y-6 gap-x-9">
        {data &&
          data.map((shoppingList: IShoppingList) => {
            return (
              <Card key={shoppingList.id} className="min-h-full max-w">
                <div className="flex justify-end px-4 pt-4 dark:text-gray-200">
                  <Dropdown inline label="" dismissOnClick={false}>
                    {shoppingList.ownerId === currentUser.user.id ? (
                      <Dropdown.Item>
                        <a
                          onClick={() => {
                            setOpenModal(true);
                            setDeleteList(shoppingList.id);
                          }}
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {t("Delete list")}
                        </a>
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item className="cursor-not-allowed">
                        <span className="block px-4 py-2 text-sm text-gray-500 dark:text-gray-200 dark:hover:bg-gray dark:hover:text-white">
                          {t("Delete list")}
                        </span>
                      </Dropdown.Item>
                    )}
                  </Dropdown>
                </div>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {shoppingList.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {t("Author", { author: shoppingList.author })}
                </p>
                <div className="align-bottom">
                  <NavLink to={"/shoppingList/" + shoppingList.id}>
                    <Button>
                      {t("View shopping list")}
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

      <div className="mt-10">
        {data && (
          <Chart
            options={{
              chart: {
                id: "shoppingListOverviewChart",
                type: "bar",
              },
            }}
            series={[
              {
                name: "Items",
                data: data.map((list: IShoppingList) => {
                  return {
                    x: list.name,
                    y: list.items.length,
                  };
                }),
              },
            ]}
            type="bar"
            width="380"
          />
        )}
      </div>
      <AddNewListModal />

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          {t("Are you sure you want to delete this list")}
        </Modal.Header>
        <Modal.Footer>
          <Button
            onClick={() => {
              handleDelete(deleteList as number);
              setDeleteList(null);
              setOpenModal(false);
            }}
          >
            {t("Delete")}
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            {t("No")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShoppingListOverview;

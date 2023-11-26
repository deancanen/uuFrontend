import { Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Role, IShoppingList } from "../../interfaces/ShoppingList";
import { OutletContext } from "../../pages/layout/layout";
import { API } from "../../service/restService";
import { useMutation } from "react-query";

interface ShoppingListUsersProps {
  shoppingList: IShoppingList;
  currentUser: OutletContext["user"];
}

async function updateShoppingList(shoppingList: IShoppingList) {
  const res = await API.post(`/shoppingLists/${shoppingList.id}`, shoppingList);
  return res.data;
}

function ShoppingListUsers(props: ShoppingListUsersProps) {
  const [shoppingListUsers, setShoppingListUsers] = useState(
    props.shoppingList.users
  );

  const currentUser = props.currentUser;

  const isAuthor = props.shoppingList.ownerId === currentUser.user.id;

  const updateShoppingListMutation = useMutation(updateShoppingList, {
    onSuccess: () => {
      console.log(`Updated shopping list ${props.shoppingList.id}`);
    },
  });

  useEffect(() => {
    updateShoppingListMutation.mutate({
      ...props.shoppingList,
      users: shoppingListUsers,
    });
  }, [shoppingListUsers]);

  const [newUserMode, setNewUserMode] = useState(false);
  const [newUser, setNewUser] = useState({
    id: Math.floor(Math.random() * 1000) + 10,
    name: "New User",
    role: Role.EDITOR,
  });

  return (
    <div className="mt-6 mx-20 block">
      <h1 className="text-3xl font-extrabold text-black dark:text-white">
        List of shopping list users
      </h1>

      <ul className="divide-y divide-gray-200">
        {shoppingListUsers.map((user) => (
          <li key={user.name} className="py-4">
            <div className="ml-3 grid md:grid-cols-2 justify-between">
              <div className="col-span-1 gap-y-3 mb-1 sm:mb-0">
                <p className="text-xl font-bold text-black">
                  {props.currentUser.user.id === user.id
                    ? user.name + " (you)"
                    : user.name}
                </p>
                <p className="text-sm font-medium text-gray-900">{user.role}</p>
              </div>
              <div className="col-span-1 flex gap-x-3 mb-1 text-sm font-medium justify-end">
                {props.currentUser.user.id === user.id &&
                  user.role === Role.EDITOR && (
                    <Button
                      color="failure"
                      onClick={(_) => {
                        setShoppingListUsers(
                          shoppingListUsers.filter((u) => u.id !== user.id)
                        );

                        window.location.href = "/";
                      }}
                    >
                      Leave this shopping list
                    </Button>
                  )}
                {currentUser.user.id !== user.id && isAuthor && (
                  <Button
                    color="failure"
                    onClick={(_) => {
                      setShoppingListUsers(
                        shoppingListUsers.filter((u) => u.id !== user.id)
                      );
                    }}
                  >
                    Remove User
                  </Button>
                )}
              </div>
            </div>
          </li>
        ))}
        {newUserMode && (
          <li className="py-4">
            <div className="ml-3 grid md:grid-cols-2 justify-between">
              <div className="col-span-1 gap-y-3 mb-1 sm:mb-0">
                <TextInput
                  required
                  placeholder="New User"
                  onChange={(e) => {
                    setNewUser({ ...newUser, name: e.target.value });
                  }}
                />
              </div>
              <div className="col-span-1 flex gap-x-3 mb-1 text-sm font-medium justify-end">
                <Button
                  color="success"
                  onClick={(_) => {
                    setShoppingListUsers([...shoppingListUsers, newUser]);
                    setNewUserMode(false);
                    setNewUser({
                      id: Math.floor(Math.random() * 1000) + 10,
                      name: "New User",
                      role: Role.EDITOR,
                    });
                  }}
                >
                  Add User
                </Button>
                <Button
                  color="failure"
                  onClick={(_) => {
                    setNewUserMode(false);
                    setNewUser({
                      id: Math.floor(Math.random() * 1000) + 10,
                      name: "New User",
                      role: Role.EDITOR,
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </li>
        )}
      </ul>
      {!newUserMode && isAuthor && (
        <Button
          color="blue"
          className="mt-4"
          onClick={(_) => setNewUserMode(true)}
        >
          Add new User
        </Button>
      )}
    </div>
  );
}

export default ShoppingListUsers;

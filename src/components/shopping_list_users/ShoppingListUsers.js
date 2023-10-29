import { Button, TextInput } from "flowbite-react";
import { useState } from "react";

function ShoppingListUsers(props) {
  const [shoppingListUsers, setShoppingListUsers] = useState(
    props.shoppingList.users
  );

  const [newUserMode, setNewUserMode] = useState(false);
  const [newUser, setNewUser] = useState({
    id: Math.floor(Math.random() * 1000) + 10,
    name: "New User",
    role: "User",
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
                  {props.currentUser.id === user.id
                    ? user.name + " (you)"
                    : user.name}
                </p>
                <p className="text-sm font-medium text-gray-900">{user.role}</p>
              </div>
              <div className="col-span-1 flex gap-x-3 mb-1 text-sm font-medium justify-end">
                {props.currentUser.id === user.id && user.role === "User" && (
                  <Button
                    color="failure"
                    onClick={(_) => {
                      alert(
                        "You have removed yourself from the list. (potom redirect nejspis na listy, zatim refreshuju stranku)"
                      );
                      window.location.reload();
                    }}
                  >
                    Leave this shopping list
                  </Button>
                )}
                {props.currentUser.id !== user.id &&
                  user.role === "User" &&
                  props.currentUser.role === "Author" && (
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
                      role: "User",
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
                      role: "User",
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
      {!newUserMode && props.currentUser.role === "Author" && (
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

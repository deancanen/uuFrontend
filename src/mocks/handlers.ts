import { http, HttpResponse } from "msw";
import { IShoppingList, Role } from "../interfaces/ShoppingList";

const defaultUsers = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Petr Novák",
  },
  {
    id: 3,
    name: "Jana Vomáčková",
  },
  {
    id: 4,
    name: "John Vomáčka",
  },
];

const defaultShoppingLists: IShoppingList[] = [
  {
    id: 1,
    name: "Nákup na víkend",
    author: "John Doe",
    ownerId: 1,
    items: [
      {
        name: "Mléko",
        resolved: true,
      },
      {
        name: "Chléb",
        resolved: false,
      },
      {
        name: "Pivo",
        resolved: false,
      },
    ],
    users: [
      {
        id: 1,
        name: "John Doe",
        role: Role.OWNER,
      },
      {
        id: 2,
        name: "Petr Novák",
        role: Role.EDITOR,
      },
    ],
  },
  {
    id: 2,
    name: "Nákup na neděli",
    author: "John Vomáčka",
    ownerId: 4,
    items: [
      {
        name: "Mléko",
        resolved: true,
      },
      {
        name: "Chléb",
        resolved: false,
      },
      {
        name: "Pivo",
        resolved: false,
      },
    ],
    users: [
      {
        id: 4,
        name: "John Vomáčka",
        role: Role.OWNER,
      },
      {
        id: 3,
        name: "Jana Vomáčková",
        role: Role.EDITOR,
      },
    ],
  },
];

export default [
  http.post("/api/login", () => {
    if (sessionStorage.getItem("authenticatedId")) {
      const user = defaultUsers.find(
        (user) => user.id === Number(sessionStorage.getItem("authenticatedId"))
      );
      return HttpResponse.json(
        {
          user,
        },
        { status: 200 }
      );
    }

    const user = defaultUsers[Math.floor(Math.random() * defaultUsers.length)];
    sessionStorage.setItem("authenticatedId", user.id.toString());
    return HttpResponse.json(
      {
        user,
      },
      { status: 200 }
    );
  }),
  http.get("/api/shoppingLists", () => {
    const authenticatedId = sessionStorage.getItem("authenticatedId");
    const shoppingLists = defaultShoppingLists.filter(
      (list) =>
        list.ownerId === Number(authenticatedId) ||
        list.users.find((user) => user.id === Number(authenticatedId))
    );
    return HttpResponse.json(shoppingLists, { status: 200 });
  }),
  http.post("/api/shoppingLists/create", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(body, { status: 200 });
  }),
  http.get("/api/shoppingLists/:id", async ({ params }) => {
    const shoppingList = defaultShoppingLists.find(
      (list) => list.id === Number(params.id)
    );

    return HttpResponse.json(shoppingList ? shoppingList : {}, {
      status: shoppingList ? 200 : 404,
    });
  }),
  http.post("/api/shoppingLists/:id", async ({ params, request }) => {
    const body = await request.json();
    return HttpResponse.json(body, { status: 200 });
  }),
];

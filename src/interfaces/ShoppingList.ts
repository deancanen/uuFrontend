export interface IShoppingList {
  id: number;
  name: string;
  author: string;
  ownerId: number;
  items: ShoppingListItems[];
  users: ShoppingListUsers[];
}

export interface ShoppingListItems {
  name: string;
  resolved: boolean;
}

export interface ShoppingListUsers {
  id: number;
  name: string;
  role: Role;
}

export enum Role {
  OWNER = "Owner",
  EDITOR = "Editor",
}

// https://vike.dev/data

import type { PageContextServer } from "vike/types";

const todosDefault = [{ text: "Buy milk" }, { text: "Buy strawberries" }];
export type Data = {
  todo: { text: string }[];
};

export default async function data(_pageContext: PageContextServer): Promise<Data> {
  return { todo: todosDefault };
}

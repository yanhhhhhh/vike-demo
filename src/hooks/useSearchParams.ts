import { usePageContext } from "vike-react/usePageContext";

export function useSearchParams() {
  const pageContext = usePageContext();

  const search = new URLSearchParams(pageContext.urlParsed.search);

  return [search];
}

import { create } from "@/components/icons/icons";
create();
console.log("I'm the first line of client-side JavaScript.");

// (function () {
//   create();
// })();
window.addEventListener("resize", function () {
  console.log("resize");
});

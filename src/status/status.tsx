import type { PageProps } from "../types/pages";
import NavBar from "../ui/navBar";

export default function Status(props: PageProps) {
  return (
    <>
      <NavBar onNav={props.onNav} />
      <h1>Status</h1>
    </>
  );
}

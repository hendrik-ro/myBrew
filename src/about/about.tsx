import type { PageProps } from "../types/pages";
import NavBar from "../ui/navBar";

export default function About(props: PageProps) {
  return (
    <>
      <NavBar onNav={props.onNav} />
      <h1>About</h1>
    </>
  );
}

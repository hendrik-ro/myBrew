export default function Footer() {
  const date = new Date();
  return (
    <footer>
      <p>© AGPL {date.getFullYear()} My Brew</p>
    </footer>
  );
}

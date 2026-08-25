export default function Footer() {
  const date = new Date();
  return (
    <footer
      style={{
        width: "100%",
        textAlign: "end",
        fontSize: "0.8rem",
        marginTop: "auto",
        height: "1.1rem",
      }}
    >
      <p>© AGPL {date.getFullYear()} My Brew</p>
    </footer>
  );
}

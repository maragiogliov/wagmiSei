function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="App-footer">
      <small>© {year} Dr. Pepe Commerce. All rights reserved.</small>
    </footer>
  );
}

export default Footer;

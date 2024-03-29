import './footer.styles.scss'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="footer-container">
      <span>&#169; The Olden {currentYear}. No Rights Reserved</span>
    </div>
  );
}

export default Footer
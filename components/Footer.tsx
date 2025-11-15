const Footer = () => {
  return (
    <footer className="mt-auto py-6 text-center text-sm text-gray-600">
      <p className="mb-2">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--blue-500)] hover:text-[var(--blue-700)] transition-colors"
        >
          Frontend Mentor
        </a>
      </p>
      <p>&copy; {new Date().getFullYear()} Zakaria Elkhadir. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

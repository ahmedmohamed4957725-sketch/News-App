import Main from "../components/main";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Bug fix (category):
//   This page used to read the ":category" param and pass it to <Main> as a
//   prop - but <Main> ignored props and kept its own state, so the value was
//   never used. <Main> now reads the URL param itself with useParams(), so the
//   page only has to render it.
function CategoryPage() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default CategoryPage;

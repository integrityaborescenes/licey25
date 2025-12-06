import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import { useLocation } from "react-router";
import type { IPersonData } from "../../types/person.types.ts";
import DescriptionAndPhoto from "../../components/DescriptionAndPhoto/DescriptionAndPhoto.tsx";

const Person = () => {
  // const location = useLocation();
  // const info = location.state as IPersonData;
  return (
    <>
      <header>
        <Header title="" backButton={true} />
      </header>

      <main>
        <DescriptionAndPhoto person={true} />
      </main>

      <footer>
        <Footer mainPage={false} />
      </footer>
    </>
  );
};

export default Person;

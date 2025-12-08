import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import { useLocation } from "react-router";
import type { IPersonData } from "../../types/person.types.ts";
import DescriptionAndPhoto from "../../components/DescriptionAndPhoto/DescriptionAndPhoto.tsx";
import { useSyncDuplicate } from "../../hooks/useSyncDuplicate.tsx";
import { useContext } from "react";
import { ScreenModeContext } from "../../context/ScreenModeContext.ts";

type Props = {
  info?: IPersonData;
};

const Person = ({ info: propsInfo }: Props) => {
  const location = useLocation();
  const info = propsInfo ?? (location.state as IPersonData);
  useSyncDuplicate("person", info);
  const { isDuplicate } = useContext(ScreenModeContext);

  return (
    <>
      <header>
        <Header title={info.name} backButton={!isDuplicate} />
      </header>

      <main>
        <DescriptionAndPhoto
          person={true}
          description={info.bio}
          images={info.historyPersonImages}
          personBio={info.grade}
        />
      </main>

      <footer>
        <Footer mainPage={false} />
      </footer>
    </>
  );
};

export default Person;

import Navbar from "../components/nav";
import BankList from "../services/bancos";
function Home() {
  return (
      <div className="">
      <Navbar />
      <BankList />

    </div>
  );
}

export default Home;

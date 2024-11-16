import Navbar from "../components/nav";
import Transacciones from "../services/transacciones";
function Lista_transacciones() {
  return (
      <div className="">
      <Navbar />
      <Transacciones />

    </div>
  );
}

export default Lista_transacciones;
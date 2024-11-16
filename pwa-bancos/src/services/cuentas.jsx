import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Cuentas = () => {
  const { name } = useParams(); // Obtener el nombre del banco de la URL
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetcAccountsDetails = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization:
            "Basic OTc1NjQyMGUtMWU2Zi00NTgxLTkxYjQtMmE3MjI1ZGY3OWNmOjV2elZlS0s1dV81RzRUZkBBQ0xZVmZzdFcjNGkwbm5Id3FFUTdGNUJ6YlAja3JzZDZ2Q1hDc1ItM2F2cl9jZzM=",
        },
      };

      try {
        const accountsResponse = await fetch(
          `https://sandbox.belvo.com/api/accounts/?institution=${name}`,
          options
        );
        const accountsData = await accountsResponse.json();
        setAccounts(accountsData.results || []);
      } catch (err) {
        setError("Error al cargar los detalles del banco");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetcAccountsDetails();
  }, [name]);

  if (loading) return <p className="text-center">Cargando cuentas...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center px-4 py-8 mt-10">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
        Cuentas asociadas
      </h2>
      {accounts[0]?.institution?.name && (
        <h3 className="text-lg sm:text-xl md:text-2xl mb-6 text-gray-600 text-center">
          Banco: {accounts[0].institution.name}
        </h3>
      )}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {accounts.map((account) => (
          <li
            key={account.id}
            className="flex flex-col bg-white rounded-lg shadow-lg border hover:shadow-xl transition-all p-4"
          >
            <h2 className="text-lg font-bold mb-2">Cuenta: {account.name}</h2>
            <p className="text-sm text-gray-500 mb-4">
              <strong>Saldo:</strong> {account.balance.current}
            </p>
            <Link to={`/cuenta/${account.id}/${account.link}`}>
              <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                Ver transacciones
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cuentas;

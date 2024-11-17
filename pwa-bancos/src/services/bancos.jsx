import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BankList = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanks = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization:
            "Basic OTc1NjQyMGUtMWU2Zi00NTgxLTkxYjQtMmE3MjI1ZGY3OWNmOjV2elZlS0s1dV81RzRUZkBBQ0xZVmZzdFcjNGkwbm5Id3FFUTdGNUJ6YlAja3JzZDZ2Q1hDc1ItM2F2cl9jZzM=",
        },
      };

      try {
        const response = await fetch(
          "https://sandbox.belvo.com/api/institutions/?page_size=100",
          options
        );
        const data = await response.json();
        setBanks(data.results || []);
      } catch (err) {
        setError("Error al cargar los bancos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  if (loading) return <p className="text-center">Cargando bancos...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const filteredBanks = banks.filter((bank) =>
    [
      "erebor_br_retail",
      "gotham_br_business",
      "gringotts_br_retail",
      "erebor_co_retail",
      "erebor_mx_retail",
      "gringotts_co_retail",
    ].includes(bank.name)
  );

  return (
    <div className="flex flex-col items-center justify-center px-4 mt-14">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-4 text-white">
        Lista de Bancos
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBanks.map((bank) => (
          <li
            key={bank.id}
            className=" flex flex-col items-center bg-white rounded-lg shadow-lg border hover:bg-slate-100 p-4"
          >
            <Link to={`/bank/${bank.name}`} className="w-full text-center">
              <div className="text-lg font-bold mb-2">{bank.display_name}</div>
              <div className="text-sm text-gray-500">País: {bank.country_code}</div>
              {bank.logo && (
                <img
                  src={bank.logo}
                  alt={`${bank.display_name} logo`}
                  className="w-full h-auto max-h-40 object-contain mt-4"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BankList;

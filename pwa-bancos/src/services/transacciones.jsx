import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Transacciones = () => {
  const { id, link } = useParams();
  const [transacciones, setTransacciones] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodasLasTransacciones = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization:
          "Basic OTc1NjQyMGUtMWU2Zi00NTgxLTkxYjQtMmE3MjI1ZGY3OWNmOjV2elZlS0s1dV81RzRUZkBBQ0xZVmZzdFcjNGkwbm5Id3FFUTdGNUJ6YlAja3JzZDZ2Q1hDc1ItM2F2cl9jZzM=",
      },
    };

    let url = `https://sandbox.belvo.com/api/transactions/?link=${link}&account=${id}`;
    let todasTransacciones = [];

    try {
      while (url) {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Error al obtener las transacciones");
        const data = await response.json();
        todasTransacciones = [...todasTransacciones, ...data.results];
        url = data.next;
      }

      todasTransacciones.sort((a, b) => new Date(b.value_date) - new Date(a.value_date));
      setTransacciones(todasTransacciones);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodasLasTransacciones();
  }, [id, link]);

  const ingresos = transacciones
    .filter((t) => t.type === "INFLOW")
    .reduce((total, t) => total + t.amount, 0)
    .toFixed(2);

  const egresos = transacciones
    .filter((t) => t.type === "OUTFLOW")
    .reduce((total, t) => total + t.amount, 0)
    .toFixed(2);

  const kpi = (ingresos - egresos).toFixed(2);

  const transaccionesPorPagina = 10;
  const totalPaginas = Math.ceil(transacciones.length / transaccionesPorPagina);

  const transaccionesActuales = transacciones.slice(
    (paginaActual - 1) * transaccionesPorPagina,
    paginaActual * transaccionesPorPagina
  );

  const cambiarPagina = (pagina) => {
    if (pagina > 0 && pagina <= totalPaginas) {
      setPaginaActual(pagina);
    }
  };

  if (loading) return <p className="text-center mt-4">Cargando detalles...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="flex flex-col items-center px-4 py-8 mt-10">
      <div className="flex flex-col bg-green-200 rounded-lg shadow-md w-full max-w-4xl p-6 mb-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          KPI: ${kpi} {transaccionesActuales[0]?.currency}
        </h3>
        <div className="flex flex-col sm:flex-row justify-between text-sm sm:text-base">
          <p>
            <strong>Ingresos:</strong> {ingresos.toLocaleString()} {transaccionesActuales[0]?.currency}
          </p>
          <p>
            <strong>Egresos:</strong> {egresos.toLocaleString()} {transaccionesActuales[0]?.currency}
          </p>
          <p>
            <strong>Banco:</strong> {transaccionesActuales[0]?.account?.institution?.name}
          </p>
          <p>
            <strong>Cuenta:</strong> {transaccionesActuales[0]?.account?.name}
          </p>
        </div>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-4 text-white">Transacciones</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {transaccionesActuales.map((t) => (
          <li key={t.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <p>
              <strong>Descripción:</strong> {t.description || "Sin descripción"}
            </p>
            <p>
              <strong>Monto:</strong> {t.amount} {t.currency}
            </p>
            <p>
              <strong>Tipo:</strong> {t.type}
            </p>
            <p>
              <strong>Estado:</strong> {t.status}
            </p>
            {t.merchant && (
              <p>
                <strong>Comercio:</strong> {t.merchant.name}
              </p>
            )}
            <p>
              <strong>Fecha de valor:</strong> {t.value_date}
            </p>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-6 w-full max-w-4xl">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>
        <span className="text-sm sm:text-base">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Transacciones;

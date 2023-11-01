import Menu from "./Menu";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import { updateClient } from "./apiCore";

const Home = () => {
  const [data, setData] = useState([]);
  const [logistica, setLogistica] = useState("");
  const [tentativasEntrega, setTentativasEntrega] = useState("");
  const [transportador, setTransportador] = useState("");

  async function fetchData() {
    try {
      const response = await fetch("/entregas_atrasadas.json");
      if (!response.ok) {
        throw new Error(`Network response was not ok ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const openModal = (item) => {
    setLogistica(item.Logistica_c01_F0FFF0);
    setTentativasEntrega(item.Tentativas_entregas_c01_F0FFF0);
    setTransportador(item.Transportador_c01_F0FFF0);
  };

  const saveChanges = async (item) => {
    const logistica = document.getElementById("logisticaDropdown").value;
    const tentativasEntrega =
      document.getElementById("tentativasEntrega").value;
    const transportador = document.getElementById(
      "transportadorDropdown"
    ).value;

    console.log("BOTAO SALVAR foi clicado");

    const updatedData = {
      Logistica_c01_F0FFF0: logistica,
      Tentativas_entregas_c01_F0FFF0: tentativasEntrega,
      Transportador_c01_F0FFF0: transportador,
    };
    console.log(`${item.Cliente_c01_F0FFF0}`);

    console.log(updatedData);
    try {
      const data = await updateClient(item.id, updatedData);

      if (!data || data.error) {
        console.error("Error saving data:", data.error);
        // Handle the error here, such as showing an error message to the user
      } else {
        console.log("Data saved successfully");
        // Close the modal, update the UI, or take other actions as needed
      }
    } catch (error) {
      console.error("Error saving data:", error);
      // Handle the error here, such as showing an error message to the user
    }
  };

  return (
    <>
      <Layout
        title="Tabela de Dados"
        description="Projeto Dejair"
        className=" container-fluid"
      ></Layout>
      <div className="p-2 table-responsive-lg">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Cliente</th>
              <th scope="col">Romaneio</th>
              <th scope="col">Transportador</th>
              <th scope="col">Previsão de Entrega</th>
              <th scope="col">Logística</th>
              <th scope="col">Tentativas de Entrega</th>
              <th scope="col">Horas Atrasadas</th>
              <th scope="col">Opções</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td style={{ backgroundColor: "#F0FFF0" }}>
                  {item.Cliente_c01_F0FFF0}
                </td>
                <td style={{ backgroundColor: "#F0FFF0" }}>
                  {item.Romaneio_c01_F0FFF0}
                </td>
                <td style={{ backgroundColor: "#F0FFF0" }}>
                  {item.Transportador_c01_F0FFF0}
                </td>
                <td style={{ backgroundColor: "#F0FFF0" }}>
                  {item.Previsao_entrega_c01_F0FFF0}
                </td>
                <td style={{ backgroundColor: "#F0FFF0" }}>
                  {item.Logistica_c01_F0FFF0}
                </td>
                <td style={{ backgroundColor: "#F0FFF0" }}>
                  {item.Tentativas_entregas_c01_F0FFF0}
                </td>
                <td style={{ backgroundColor: "#00FFFF" }}>
                  {item.Horas_Atrasadas_c02_00FFFF}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal-${item.id}`}
                    onClick={() => openModal(item)}
                  >
                    Opções
                  </button>

                  <div
                    className="modal fade"
                    id={`exampleModal-${item.id}`}
                    tabIndex="-1"
                    aria-labelledby={`exampleModalLabel-${item.id}`}
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Opções
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="mb-3 ">
                            <label
                              htmlFor="logisticaDropdown"
                              className="form-label"
                            >
                              <strong>Logística:</strong>
                            </label>
                            <select
                              className="form-select"
                              id="logisticaDropdown"
                              value={logistica}
                              onChange={(e) => setLogistica(e.target.value)}
                            >
                              <option value="">Selecione</option>
                              <option value="balcao">Balcao</option>
                              <option value="entrega">Entrega</option>
                            </select>
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="tentativasEntrega"
                              className="form-label"
                            >
                              <strong>Tentativas de Entrega:</strong>
                            </label>
                            <br></br>
                            <input
                              type="number"
                              id="tentativasEntrega"
                              className="form-control"
                              value={tentativasEntrega}
                              onChange={(e) =>
                                setTentativasEntrega(e.target.value)
                              }
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="transportador"
                              className="form-label"
                            >
                              <strong>Transportador:</strong>
                            </label>
                            <select
                              className="form-select"
                              id="transportadorDropdown"
                              value={transportador}
                              onChange={(e) => setTransportador(e.target.value)}
                            >
                              <option value="">Selecione</option>
                              <option value="LUIZ HENRIQUE OLIVEIRA ANDRADE">
                                LUIZ HENRIQUE OLIVEIRA ANDRADE
                              </option>
                              <option value="MATEUS HENRIQUE AMANCIO VICENTE">
                                MATEUS HENRIQUE AMANCIO VICENTE
                              </option>
                              <option value="CRISTIAN NOGUEIRA AMARAL">
                                CRISTIAN NOGUEIRA AMARAL
                              </option>
                              <option value="COSME GONCALVES TEIXEIRA">
                                COSME GONCALVES TEIXEIRA
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => saveChanges(item)}
                          >
                            Salvar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;

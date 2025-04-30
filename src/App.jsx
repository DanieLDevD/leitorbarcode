import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function App() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

    scanner.render(
      (decodedText) => {
        document.getElementById(
          "output"
        ).innerText = `Código lido: ${decodedText}`;
        scanner.clear(); // Para após uma leitura
      },
      (error) => {
        console.log(error); // Erros de leitura
        // Erros ignorados
      }
    );

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Leitor de Código de Barras</h1>
      <div id="reader" style={{ width: "300px", margin: "auto" }}></div>
      <div
        id="output"
        style={{ marginTop: "20px", fontSize: "1.5em", color: "green" }}
      >
        Aguardando leitura...
      </div>
    </div>
  );
}

export default App;


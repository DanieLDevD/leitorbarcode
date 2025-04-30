import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function App() {
  const beepRef = useRef(null);
  const [codigos, setCodigos] = useState(() => {
    // Inicializa com o que estiver salvo no localStorage
    const armazenados = localStorage.getItem("codigos");
    return armazenados ? JSON.parse(armazenados) : [];
  });

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

    scanner.render(
      (decodedText) => {
        // Evita código duplicado
        if (!codigos.includes(decodedText)) {
          const novosCodigos = [...codigos, decodedText];
          setCodigos(novosCodigos);
          localStorage.setItem("codigos", JSON.stringify(novosCodigos));
        }

        // Mostra código atual na tela
        document.getElementById(
          "output"
        ).innerText = `Código lido: ${decodedText}`;

        // Toca o som
        if (beepRef.current) {
          beepRef.current.play();
        }

        // Continua lendo (não para o scanner)
      },
      (error) => {
        console.log("Erro de leitura:", error);
      }
    );

    return () => {
      scanner.clear();
    };
  }, [codigos]);

  return (
    <div
      style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}
    >
      <h1>Leitor de Código de Barras</h1>
      <div id="reader" style={{ width: "300px", margin: "auto" }}></div>

      <div
        id="output"
        style={{ marginTop: "20px", fontSize: "1.5em", color: "green" }}
      >
        Aguardando leitura...
      </div>

      <h2 style={{ marginTop: "30px" }}>Códigos Lidos:</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {codigos.map((codigo, index) => (
          <li key={index} style={{ fontSize: "1.2em" }}>
            {codigo}
          </li>
        ))}
      </ul>

      {/* Som do beep */}
      <audio ref={beepRef} src="/beep.mp3" preload="auto" />
    </div>
  );
}

export default App;

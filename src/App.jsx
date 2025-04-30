import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function App() {
  const beepRef = useRef(null); // Referência ao som

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

    scanner.render(
      (decodedText) => {
        document.getElementById(
          "output"
        ).innerText = `Código lido: ${decodedText}`;

        // 🔊 Toca o som
        if (beepRef.current) {
          beepRef.current.play();
        }

        scanner.clear(); // Para após uma leitura
      },
      (error) => {
        console.log(error); // Ignora erros de leitura
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

      {/* 🔉 Elemento de áudio escondido */}
      <audio ref={beepRef} src="/beep.mp3" preload="auto" />
    </div>
  );
}

export default App;

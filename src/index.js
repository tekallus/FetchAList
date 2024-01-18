import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  const apiURL = "https://www.anapioficeandfire.com/api/books?pageSize=30";
  const [data, setData] = useState([]);
  //veriyi cek asenkron oldugu icin "async" ve "await" kullanildi
  //API'den veri çekerken hatalar olabilir. Bu nedenle try-catch bloğu ile hata kontrolü eklenmiştir.

  const fetchData = async () => {
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  };
  useEffect(() => {
    const handleClick = () => {
      fetchData(); // useEffect içinde çağrarak component mount edildiğinde veriyi çekiyoruz
    };
  }, []); // Boş dizi, sadece component mount olduğunda çalışmasını sağlar

  return (
    <div className="App">
      <h1>Game of Thrones Kitapları</h1>
      <h2>API'den liste alın ve görüntüleyin</h2>

      {/* Fetch data  API "fetch-button" eklendi*/}
      <div>
        <button className="fetch-button" onClick={fetchData}>
          Fetch Data
        </button>
        <br />
      </div>

      {/* API'den gelen veriyi gösterme: */}
      <div className="books">
        {data.map((book) => (
          <div key={book.isbn} className="book">
            <h3>Book Number: {book.number}</h3>
            <h2>{book.name}</h2>
            <div className="details">
              <p>👨: {book.authors.join(", ")}</p>
              <p>📖: {book.numberOfPages} pages</p>
              <p>🏘️: {book.country}</p>
              <p>⏰: {book.released}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

import './App.css';
import Row from './Row';
import requests from './requests';
import Banner from './Banner';
import Nav from './Nav';

function App() {
  return (
    <div className="App">
      {/* Header Navbar */}
      <Nav />
      {/* movie banner */}
      <Banner />

      {/* Genre rows */}
      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comdies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Roamnce" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Horror" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Documentries" fetchUrl={requests.fetchDocumentries} />
    </div>
  );
}

export default App;


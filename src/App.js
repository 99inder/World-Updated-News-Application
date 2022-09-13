// import './App.css';
import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {

  const title = "World Updated"
  const pageSize = 9;
  const apiKey = "27e4cb4ae315449a83a1a52a49dc9283";

  const [progress, setProgress] = useState(0)

  return (
    <div>
      <Router>

        <div>
          <LoadingBar color='#f11946' progress={progress} height={3} onLoaderFinished={() => setProgress(0)} />
        </div>

        <Navbar />
        <Routes>
          {/* <News title= {"Title Here"} country= {""} category={""} pageSize = {30} apiKey={""} />*/}

          <Route path="/" element={<News key="general" title={title} country={"in"} category={"general"} pageSize={pageSize} apiKey={apiKey} setProgress={setProgress} />} />
          <Route path="/business" element={<News key="business" title={title} country={"in"} category={"business"} pageSize={pageSize} apiKey={apiKey} setProgress={setProgress} />} />
          <Route path="/entertainment" element={<News key="entertainment" title={title} country={"in"} category={"entertainment"} pageSize={pageSize} apiKey={apiKey} setProgress={setProgress} />} />
          <Route path="/health" element={<News key="health" title={title} country={"in"} category={"health"} pageSize={pageSize} apiKey={apiKey} setProgress={setProgress} />} />
          <Route path="/science" element={<News key="science" title={title} country={"in"} category={"science"} pageSize={pageSize} apiKey={apiKey} setProgress={setProgress} />} />
          <Route path="/sports" element={<News key="sports" title={title} country={"in"} category={"sports"} pageSize={pageSize} apiKey={apiKey} setProgress={setProgress} />} />
          <Route path="/technology" element={<News key="technology" title={title} country={"in"} category={"technology"} pageSize={pageSize} apiKey={apiKey} setProgress={setProgress} />} />


        </Routes>
      </Router>
    </div>
  )

}

export default App;
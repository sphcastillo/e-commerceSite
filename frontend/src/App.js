import React from "react";
import { BrowserRouter } from "react-router-dom";
import Product from "./components/Product";
import data from "./data";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">Shopping Site</a>
          </div>
          <div>
            <a href="/cart">Cart</a>
            <a href="/signin">Sign In</a>
          </div>
        </header>
        <main>
          <Route path="/" component={HomeScreen} ></Route>
          <div>
            <div className="row center"> 
            {data.products.map((product) => (
              <Product key={product._id} product={product}></Product>

            ))} 
            </div>
          </div>
        </main>
        <footer class="row center">All right reserved.</footer>
      </div>
  </BrowserRouter>
  );
}

export default App;

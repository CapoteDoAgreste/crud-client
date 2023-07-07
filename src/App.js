import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Card from "./components/cards";
import $ from "jquery";

function App() {
  const [values, setValues] = useState();
  const [listGames, setListGames] = useState();
  const [refresh, refreshInit] = useState(0);

  const [url, setUrl] = useState("http://localhost:3001/getCards");

  //list all games and storage information
  useEffect(() => {
    getListGame();
  }, [refresh]);

  async function getListGame(url_) {
    await axios.get(url).then((response) => {
      setListGames(response.data);
    });
  }

  const cardRefresh = () => {
    refreshInit(refresh + 1);
    refreshInit(refresh + 1);
    refreshInit(refresh + 1);
    refreshInit(refresh + 1);
  };

  //get data from inputs
  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  //Submit all alocated data
  const handleClickButton = () => {
    try {
      console.log(values);
      axios
        .post("http://localhost:3001/register", {
          name: values.name,
          cost: values.cost,
          category: values.category,
        })
        .then((response) => {
          console.log(response);
          refreshInit(refresh + 1);
        })
        .catch((error) => {});
    } catch (e) {}
  };

  //format price value to money type
  $(document).on("keydown", ".money", function (e) {
    var input = $(this);
    var oldVal = input.val();
    var regex = new RegExp(input.attr("pattern"), "g");

    setTimeout(function () {
      var newVal = input.val();
      if (!regex.test(newVal)) {
        input.val(oldVal);
      }
    }, 1);
  });

  function search(value) {
    setUrl(`http://localhost:3001/s/${value}`);
    refreshInit(refresh + 1);
  }

  return (
    <div className="app-container">
      <div class="card register--container mx-auto">
        <div class="card-body">
          <h5 class="card-title text-center">Basic Crud</h5>
          <div class="form-group">
            <input
              type="text"
              class="form-control register--input"
              placeholder="Nome"
              name="name"
              onChange={handleChangeValues}
              maxLength={45}
            />
            <input
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              placeholder="0.00"
              pattern="^\d*(\.\d{0,2})?$"
              class="form-control register--input money"
              name="cost"
              onChange={handleChangeValues}
            />
            <input
              type="text"
              class="form-control register--input"
              placeholder="Category"
              name="category"
              onChange={handleChangeValues}
              maxLength={45}
            />
            <button
              type="button"
              class="btn btn-primary register--button"
              onClick={() => {
                handleClickButton();
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div class="input-group mb-3 search-input">
        <input
          id="search-input"
          type="text"
          class="form-control"
          placeholder="Insira o nome de um jogo"
          aria-label="Insira o nome de um jogo"
          aria-describedby="button-addon2"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={() => {
            search(document.getElementById("search-input").value);
          }}
        >
          Search
        </button>
      </div>
      <div className="card-group">
        {typeof listGames !== "undefined" &&
          listGames.map((value) => {
            return (
              <Card
                cardRefresh={cardRefresh}
                key={value.id}
                setListCard={setListGames}
                id={value.idgames}
                name={value.name}
                cost={value.cost}
                category={value.category}
              ></Card>
            );
          })}
      </div>
    </div>
  );
}

export default App;

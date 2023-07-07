import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Card from "./components/cards";
import $, { get } from "jquery";

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
          clean();
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
    if (value === "") {
      setUrl("http://localhost:3001/getCards");
    } else {
      setUrl(`http://localhost:3001/s/${value}`);
    }
    refreshInit(refresh + 1);
  }

  function clean() {
    document.getElementById("name").value = "";
    document.getElementById("cost").value = "";
    document.getElementById("category").value = "";
  }

  return (
    <div className="app-container">
      <div class="card register--container mx-auto">
        <div class="card-body">
          <a href="#" class="btn btn-danger edit-btn clean-btn" onClick={clean}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
          </a>
          <h5 class="card-title text-center">Basic Crud</h5>
          <div class="form-group">
            <input
              type="text"
              class="form-control register--input"
              placeholder="Nome"
              name="name"
              id="name"
              onChange={handleChangeValues}
              maxLength={45}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleClickButton();
                }
              }}
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
              id="cost"
              onChange={handleChangeValues}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleClickButton();
                }
              }}
            />
            <input
              type="text"
              class="form-control register--input"
              placeholder="Category"
              name="category"
              id="category"
              onChange={handleChangeValues}
              maxLength={45}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleClickButton();
                }
              }}
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
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              search(document.getElementById("search-input").value);
            }
          }}
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

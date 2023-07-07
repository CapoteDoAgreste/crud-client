/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "../App.css";
import FormDialog from "./dialog";
import axios from "axios";

export default function Cards(props) {
  const [open, setOpen] = useState(false);
  const [refresh, refreshInit] = useState(0);

  //get data gived to the component
  const { id, name, cost, category, cardRefresh } = props;

  //open edit modal
  const handleOpen = () => {
    setOpen(true);
  };

  //delete game profile from database
  const deleteCard = () => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      cardRefresh();
    });
  };

  const options = {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  const formatNumber = new Intl.NumberFormat("pt-BR", options);

  return (
    <div class="mx-auto">
      <FormDialog
        open={open}
        setOpen={setOpen}
        cardRefresh={cardRefresh}
        id={id}
        name={name}
        cost={cost}
        category={category}
      />
      <div class="card game-profile">
        <div class="card-body">
          <h5 class="card-title">{name}</h5>
          <p class="card-text">{category}</p>
          <a href="#" class="btn btn-primary price-btn">
            {formatNumber.format(cost)}
          </a>

          <a href="#" class="btn btn-danger delete-btn" onClick={deleteCard}>
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

          <a href="#" class="btn btn-danger edit-btn" onClick={handleOpen}>
            Edit
          </a>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "../App.css";
import FormDialog from "./dialog";
import axios from "axios";

export default function Cards(props) {
  const [open, setOpen] = useState(false);

  //get data gived to the component
  const { id, name, cost, category } = props;

  //open edit modal
  const handleOpen = () => {
    setOpen(true);
  };

  //delete game profile from database
  const deleteCard = () => {
    axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div class="mx-auto">
      <FormDialog
        open={open}
        setOpen={setOpen}
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
            R$:{cost}
          </a>

          <a href="#" class="btn btn-danger edit-btn" onClick={handleOpen}>
            Edit
          </a>

          <a href="#" class="btn btn-danger delete-btn" onClick={deleteCard}>
            Delete
          </a>
        </div>
      </div>
    </div>
  );
}

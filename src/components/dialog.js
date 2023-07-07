import React, { useState } from "react";
import { Dialog, makeStyles } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import "../App.css";

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "#242008",
        borderRadius: "2rem",
        color: "#f5f4ee",
      },
    },
    MuiInputBase: {
      input: {
        color: "#f5f4ee",
      },
      disabled: {
        color: "rgba(255, 255, 255, 0.7)", // Change the color to your desired disabled color
      },
    },
    MuiInput: {
      underline: {
        "&:before": {
          borderBottomColor: "#f5f4ee",
        },
        "&:hover:not($disabled):before": {
          borderBottomColor: "#f5f4ee",
        },
        "&:after": {
          borderBottomColor: "#f5f4ee",
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottomColor: "#f5f4ee",
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: "#f5f4ee",
      },
      disabled: {
        color: "#f5f4ee",
      },
    },
  },
});

export default function FormDialog(props) {
  //get data gived to the component
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.name,
    cost: props.cost,
    category: props.category,
  });
  const [refresh, refreshInit] = useState(0);

  //get input data
  const handleChangeValues = (value) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [value.target.id]: value.target.value,
    }));
  };

  //submit editions
  const handleEditGame = async (values) => {
    await axios
      .put("http://localhost:3001/edit", {
        id: editValues.id,
        name: editValues.name,
        cost: editValues.cost,
        category: editValues.category,
      })
      .then((response) => {
        props.cardRefresh();
      });

    props.cardRefresh();
    handleClose();
  };

  //Delete card
  const handleDeleteGame = async (values) => {
    await axios
      .delete(`http://localhost:3001/delete/${editValues.id}`)
      .then((response) => {
        props.cardRefresh();
        handleClose();
      });
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
    props.cardRefresh();
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Dialog
          open={props.open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Editar</DialogTitle>
          <DialogContent>
            <TextField
              disabled
              margin="dense"
              id="id"
              label="id"
              defaultValue={props.id}
              type="text"
              fullWidth
              theme={theme.input}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nome do jogo"
              defaultValue={props.name}
              type="text"
              onChange={handleChangeValues}
              fullWidth
              maxLength={45}
            />
            <TextField
              autoFocus
              margin="dense"
              id="cost"
              label="preço"
              defaultValue={props.cost}
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              className="money"
              pattern="^\d*(\.\d{0,2})?$"
              onChange={handleChangeValues}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="category"
              label="Categoria"
              defaultValue={props.category}
              type="text"
              onChange={handleChangeValues}
              fullWidth
              maxLength={45}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={() => handleDeleteGame()}>
              Excluir
            </Button>
            <Button color="primary" onClick={() => handleEditGame()}>
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}

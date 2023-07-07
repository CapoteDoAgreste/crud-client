import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import {
  ChakraProvider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Button,
  ButtonGroup,
  Stack,
  Divider,
} from "@chakra-ui/react";
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
  /*
  <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
            >*/
  return (
    <ChakraProvider>
      <Card maxW="sm">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">Living room Sofa</Heading>
            <Text>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design
              with a sprinkle of vintage design.
            </Text>
            <Text color="blue.600" fontSize="2xl">
              $450
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </ChakraProvider>
  );
}

export default App;

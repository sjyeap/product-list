import React, { useState } from 'react'
import '../styles/main.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Fab, Divider } from '@mui/material'
import axios from 'axios'
import Container from './Container'

function Main() {
  const [mainButtons, setMainButtons] = React.useState([
    { name: "Overview", isActive: true },
    { name: "Industrial & Home", isActive: false },
    { name: "Jewelry", isActive: false },
    { name: "Sports", isActive: false },
  ]);

  const [fullProductList, setFullProductList] = React.useState([]);
  const [productList, setProductList] = React.useState([]);

  const theme = createTheme({
    spacing: 8,
    palette: {
      primary: {
        main: '#fff'
      },
      secondary: {
        main: '#321094'
      }
    },
  });

  // Get product list
  React.useEffect(() => {
    axios.get(`https://random-data-api.com/api/commerce/random_commerce?size=50`).then((response) => {
      console.log(response.data);
      setFullProductList(response.data);
      setProductList(response.data);
    })
  }, []);

  const handleButtonClick = (index) => {
    // Change status of button
    let tmp = mainButtons;
    tmp.forEach((el, i) => {
      if (i === index)
        tmp[index].isActive = true;
      else
        tmp[i].isActive = false;
    })
    setMainButtons([...tmp]);

    // Update display list
    switch(index) {
      case 0: //Overview
        setProductList(fullProductList);
        break;
      case 1: //Industrial & Home
        let ind_home = fullProductList.filter(prod => prod['department'].toLowerCase().includes('industrial') || prod['department'].toLowerCase().includes('home'));
        console.log(ind_home);
        setProductList(ind_home);
        console.log(productList);
        break;
      case 2: //Jewelry
        let jewel = fullProductList.filter(prod => prod['department'].toLowerCase().includes('jewelry'));
        console.log(jewel);
        setProductList(jewel);
        console.log(productList);
        break;
      case 3: //Sports
        let sport = fullProductList.filter(prod => prod['department'].toLowerCase().includes('sports'));
        console.log(sport);
        setProductList(sport);
        console.log(productList);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <div className="main-body">
        <ThemeProvider theme={theme}>
          {mainButtons.map((el, index) =>
            <Fab
              variant='extended'
              onClick={() => handleButtonClick(index)}
              color={el.isActive ? 'secondary' : 'primary'}
              key={index}
              sx={{ m: 2 }}
            >
              {el.name}
            </Fab>
          )}
        </ThemeProvider>
        <Divider />
        <Container productList={productList} />
      </div>
    </div>
  )
}

export default Main

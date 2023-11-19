import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import PedalBikeIcon from '@mui/icons-material/PedalBike';

// Imported made by me
import BarMenu from './MenuBar';
import { useState } from 'react';
import { Box, Button, Container, Link, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import type { SwapOptions } from '../states';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
color: 'inherit',
'& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    width: '12ch',
    '&:focus': {
        width: '20ch',
    },
    },
},
}));

const swapOptions: SwapOptions[] = [
    "Products",
    "Black Week",
    "Sales"
]

function swapToOption(option: SwapOptions, dsp: any) {
    return () => {
        console.log("products page should change to", option)
        dsp({ type: option })
    }
}

export default function AppBarCreate() {
    const dispatcher = useDispatch();
    return (
        <AppBar position="static" style={{ backgroundColor: "rgb(75, 75, 75)" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters style={{ position: "relative" }}>
                <PedalBikeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} onClick={_ => dispatcher({ type: null })}/>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                    onClick={_ => dispatcher({ type: null })}
                >
                    KotekpsotekBikes
                </Typography>
                <Box display={"flex"} padding={"5px"} paddingTop={"0px"} paddingBottom={"0px"} justifyContent={"space-between"}>
                    {swapOptions.map((page) => (
                    <Link
                        key={page}
                        style={{ paddingRight: "15px" }}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        onClick={swapToOption(page, dispatcher)}
                    >
                        {page}
                    </Link>
                    ))}
                </Box>
                <Search style={{ position: "absolute", right: "0px" }}>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </Toolbar>
          </Container>
        </AppBar>
    );
}

import React, { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ContrastIcon from '@mui/icons-material/Contrast';
import { MovieContext } from '../context/movie.context';
import { useNavigate } from 'react-router-dom';


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
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '35ch',
            },
        },
    },
}));

const Navbar = () => {
    const navigate = useNavigate()
    const { allMovies, setMovies, isDarkMode, setIsDarkMode } = useContext(MovieContext)
    const [searchName, setSearchName] = useState("")


    useEffect(() => {
        if (!searchName) {
            setMovies(allMovies);
        } else {
            const result = allMovies.filter(item =>
                item.title.toLowerCase().includes(searchName.toLowerCase())
            );
            setMovies(result);
        }
    }, [searchName, allMovies]);


    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };
    return (
        <div className='navbar w-full flex items-center justify-between p-4 bg-blue-500'>
            <h1>Movie App</h1>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            <div className='space-x-4'>
                <button onClick={() => navigate('/')} className='bg-gray-700 hover:bg-gray-800 text-white p-1.5 px-5 rounded-md'>Home</button>
                <button onClick={() => navigate('/edit')} className='bg-gray-700 hover:bg-gray-800 text-white p-1.5 px-5 rounded-md'>Edit</button>
                {isDarkMode ? (
                    <button onClick={toggleDarkMode}><DarkModeIcon /></button>
                ) : (
                    <button onClick={toggleDarkMode} ><ContrastIcon /></button>
                )}
            </div>

        </div>
    )
}

export default Navbar
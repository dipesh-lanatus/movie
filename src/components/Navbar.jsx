import { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { alpha, styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import ContrastIcon from '@mui/icons-material/Contrast'
import { MovieContext } from '../context/movie.context'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'

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
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '35ch',
            },
        },
    },
}))

export const Navbar = () => {
    const navigate = useNavigate()
    const { allMovies, setMovies, theme, setTheme } = useContext(MovieContext)
    const [searchName, setSearchName] = useState('')

    const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

    useEffect(() => {
        if (!searchName) setMovies(allMovies)
        else {
            navigate('/')
            const result = allMovies.filter(item =>
                normalize(item.title).includes(normalize(searchName))
            );
            setMovies(result)
        }
    }, [searchName, allMovies])

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <div className="navbar w-full flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center sm:justify-between p-4 dark:text-white bg-blue-500 dark:bg-blue-900 transition-colors">
            {/* Logo / Title */}
            <h1 className="text-xl font-bold text-white dark:text-gray-100 text-center sm:text-left">
                Movie App
            </h1>

            {/* Search bar */}
            <div className="w-full sm:w-auto flex justify-center sm:justify-start">
                <Search className="w-4/5 sm:w-auto">
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        onChange={(e) => setSearchName(e.target.value)}
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-3">
                <Button onClick={() => navigate('/')}>
                    Home
                </Button>
                <Button onClick={() => navigate('/edit')}>
                    Edit
                </Button>

                <Button onClick={toggleTheme}>
                    {theme === 'dark' ? <ContrastIcon /> : <DarkModeIcon />}
                </Button>
            </div>
        </div>
    )
}

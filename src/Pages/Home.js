import React, { useContext, useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ColorModeContext } from "../theme";
import { ThemeProvider, useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const [inputCount, setInputCount] = useState();
    const [sharedValue, setSharedValue] = useState();
    const [generatedRows, setGeneratedRows] = useState([]);


    useEffect(() => {
        const count = parseInt(inputCount) || 0;


        if (sharedValue) {
            const newRows = Array.from({ length: count }, () => ({
                value1: "",
                value2: sharedValue,
            }));
            setGeneratedRows(newRows);
        }
    }, [inputCount, sharedValue]);


    const handleAddRow = () => {
        setGeneratedRows((prevRows) => [...prevRows, { value1: "", value2: "" }]);
    };


    const handleInputChange = (index, field, newValue) => {
        const updatedRows = [...generatedRows];
        updatedRows[index][field] = newValue;
        setGeneratedRows(updatedRows);
    };


    const handleDeleteRow = (indexToDelete) => {
        const isConfirmed = window.confirm("Silmek istediğinizden emin misiniz?");
        if (isConfirmed) {
            setGeneratedRows((prevRows) =>
                prevRows.filter((_, index) => index !== indexToDelete)
            );
        }
    };

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="md">
                    <Box sx={{ flexGrow: 1, backgroundColor: "#717171", p: 5 }}>
                        <Grid container spacing={2}>
                            {/* birinci input */}
                            <Grid item xs={2}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Kredi Tutarı"
                                    
                                    
                                />
                            </Grid>
                            {/* ikinci input */}
                            <Grid item xs={2}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Diğer Masraflar"
                                   
                                />
                            </Grid>
                            {/* üçüncü input */}
                            <Grid item xs={2}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Vade Periyodu"
                                    fullWidth={true}
                                    value={inputCount}
                                   
                                    onChange={(e) => setInputCount(e.target.value)}
                                />
                            </Grid>
                            {/* dördüncü input */}
                            <Grid item xs={2}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Ödeme Tutarı"
                                    fullWidth={true}
                                    value={sharedValue}
                                   
                                    onChange={(e) => setSharedValue(e.target.value)}
                                />
                            </Grid>
                            {/* Add butonu */}
                            <Grid item xs={2} display="flex" justifyContent="flex-end">
                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    fullWidth={true}
                                    size="small"
                                    onClick={handleAddRow}
                                >
                                    EKLE
                                </Button>
                            </Grid>
                             {/* Add butonu */}
                             <Grid item xs={2} display="flex" justifyContent="flex-end">
                                <Button
                                    variant="outlined"
                                    fullWidth={true}
                                    size="small"
                                >
                                    KAYDET
                                </Button>
                            </Grid>
                            
                        </Grid>
                        <Box mt={4}>
                            <Grid container spacing={2}>
                                {generatedRows.map((row, index) => (
                                    <React.Fragment key={index}>
                                        <Grid item xs={5}>
                                            <TextField
                                                fullWidth
                                                //label={`Row ${index + 1} - Value 1`}
                                                value={row.value1}
                                                onChange={(e) =>
                                                    handleInputChange(index, "value1", e.target.value)
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={5}>
                                            <TextField
                                                fullWidth
                                                //label={`Row ${index + 1} - Value 2`}
                                                value={row.value2}
                                                onChange={(e) =>
                                                    handleInputChange(index, "value2", e.target.value)
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
                                            <Button
                                                variant="contained"
                                                color="error"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => handleDeleteRow(index)}
                                            >
                                                SİL
                                            </Button>
                                        </Grid>
                                    </React.Fragment>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default Home;

import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
    searchterm:"",
    filteredTable: "",
    checked: false,
    table: [
    { Id: 1, Nombre: "Juan", Edad: 32, Ciudad: "París" },
    { Id: 2, Nombre: "Pablo", Edad: 25, Ciudad: "New York" },
    { Id: 3, Nombre: "Antonio", Edad: 17, Ciudad: "Madrid" },
    { Id: 4, Nombre: "Sara", Edad: 43, Ciudad: "Roma" },
    { Id: 5, Nombre: "Belén", Edad: 23, Ciudad: "Londres" },
    { Id: 6, Nombre: "Patricia", Edad: 15, Ciudad: "Tokio" },
    { Id: 7, Nombre: "Jose", Edad: 24, Ciudad: "Singapur" },
    { Id: 8, Nombre: "Marta", Edad: 28, Ciudad: "Berlin" },
    { Id: 9, Nombre: "Adrián", Edad: 37, Ciudad: "Barcelona" }
    ]
};

export const tableSlice = createSlice({
    name: 'table',
    initialState: initialState,
    checked: false,
    reducers: {
        sortTable: (state, action) => {
            const param = action.payload;
            state.table.sort((a, b) => {
                if (a[param] < b[param]) return -1;
                if (a[param] > b[param]) return 1;
                return 0;
            })
        },
        filteredTable: (state, action) => {
            const filter = action.payload.search;
            const column = action.payload.column;
            console.log(filter, column)
            const filteredResult = state.table.filter(row => {
                if (column === "Nombre") return row.Nombre.toLowerCase().includes(filter.toLowerCase());
                if (column === "Edad") return row.Edad.toString().includes(filter);
                if (column === "Ciudad") return row.Ciudad.toLowerCase().includes(filter.toLowerCase());
                else return(
                    row.Nombre.toLowerCase().includes(filter.toLowerCase()) ||
                    row.Edad.toString().includes(filter) ||
                    row.Ciudad.toLowerCase().includes(filter.toLowerCase())
                );
            })
            state.table = filteredResult;
        },
        resetTable: (state, action) => {
            state = initialState;
        },
        toggleIdColumn: (state, action) => {
            state.checked = !state.checked;
        }
    }
});

export const { sortTable, filteredTable, resetTable, toggleIdColumn } = tableSlice.actions;

export default tableSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredTable: "",
    selectedRows: [],
    checked: false,
    page: 1,
    pageSize: 5,
    totalItems: 18,
    table: [
    { Id: 1, Nombre: "Juan", Edad: 32, Ciudad: "París" },
    { Id: 2, Nombre: "Pablo", Edad: 25, Ciudad: "New York" },
    { Id: 3, Nombre: "Antonio", Edad: 17, Ciudad: "Madrid" },
    { Id: 4, Nombre: "Sara", Edad: 43, Ciudad: "Roma" },
    { Id: 5, Nombre: "Belén", Edad: 23, Ciudad: "Londres" },
    { Id: 6, Nombre: "Patricia", Edad: 15, Ciudad: "Tokio" },
    { Id: 7, Nombre: "Jose", Edad: 24, Ciudad: "Singapur" },
    { Id: 8, Nombre: "Marta", Edad: 28, Ciudad: "Berlin" },
    { Id: 9, Nombre: "Adrián", Edad: 37, Ciudad: "Barcelona" },
    { Id: 10, Nombre: "Juan", Edad: 32, Ciudad: "París" },
    { Id: 11, Nombre: "Pablo", Edad: 25, Ciudad: "New York" },
    { Id: 12, Nombre: "Antonio", Edad: 17, Ciudad: "Madrid" },
    { Id: 13, Nombre: "Sara", Edad: 43, Ciudad: "Roma" },
    { Id: 14, Nombre: "Belén", Edad: 23, Ciudad: "Londres" },
    { Id: 15, Nombre: "Patricia", Edad: 15, Ciudad: "Tokio" },
    { Id: 16, Nombre: "Jose", Edad: 24, Ciudad: "Singapur" },
    { Id: 17, Nombre: "Marta", Edad: 28, Ciudad: "Berlin" },
    { Id: 18, Nombre: "Adrián", Edad: 37, Ciudad: "Barcelona" }
    ]
};

export const tableSlice = createSlice({
    name: 'table',
    initialState: initialState,
    filteredTable: "",
    selectedRows: [],
    checked: false,
    page: 1,
    pageSize: 5,
    totalItems: 18,
    table: [],
    reducers: {
        sortTable: (state, action) => {
            const param = action.payload;
            console.log("Entrando en ordenación con " + param)
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
        },
        selectOrDeselectAll: state => {
            if (state.selectedRows == "") {
                state.selectedRows = state.table.map((_, index) => index);
            }else {
                state.selectedRows = [];
            }
        },
        selectRow: (state, action) => {
            state.selectedRows.push(action.payload)
        },
        deselectRow: (state, action) => {
            state.selectedRows = state.selectedRows.filter( index => index !== action.payload)
        },
        trashTable: (state, action) => {
            // pasan a formar parte del nuevo arreglo con filter aquellos elementos cuya expresión evalúe a True
            //Esta expresión se ejecuta para cada uno de ellos
            state.table = state.table.filter((row, index) => !state.selectedRows.includes(index));
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
        },
        setTableData: (state, action) => {
            state.table = action.payload;
          },
        setTotalItems: (state, action) => {
            state.totalItems = action.payload;
        },
        moveRow: (state, action) => {
            console.log("Entrando en moveRow..")
            const {id, position} = action.payload;
            const initialIndex = state.table.findIndex(row => row.Id === id);
            const row = state.table[initialIndex];
            //procedemos a eliminar fila de su posición original e introducirla en la posición final
            // cortamos en "initialIndex", una fila
            state.table.splice(initialIndex,1);
            //"pegamos" (no cortamos nada) en el indice final(position), el elemento especificado (row)
            state.table.splice(position, 0, row)
        }
    }
});

export const { sortTable, filteredTable, resetTable, toggleIdColumn, selectOrDeselectAll, selectRow, deselectRow, trashTable, setPage, setPageSize, setTableData, setTotalItems, moveRow } = tableSlice.actions;

export default tableSlice.reducer;
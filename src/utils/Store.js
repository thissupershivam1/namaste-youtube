import appSlice from "./appSlice";
import searchSlice from "./searchSlice";

const { configureStore } = require("@reduxjs/toolkit");


const store=configureStore({

    reducer:{
        app:appSlice,
        search:searchSlice,
    },

});

export default store;
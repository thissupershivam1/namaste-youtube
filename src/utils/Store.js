import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import channelSlice from "./channelSlice";

const { configureStore } = require("@reduxjs/toolkit");



const store=configureStore({

    reducer:{
        app:appSlice,
        search:searchSlice,
        channel:channelSlice
    },

});

export default store;
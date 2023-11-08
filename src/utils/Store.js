import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import channelSlice from "./channelSlice";
import chatSlice from "./chatSlice";
import AddChatItem from "./AddChatItem";

const { configureStore } = require("@reduxjs/toolkit");



const store=configureStore({

    reducer:{
        app:appSlice,
        search:searchSlice,
        channel:channelSlice,
        chat:AddChatItem
    },

});

export default store;
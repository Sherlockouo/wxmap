import io from "../libs/socket.io"

const url = "wss://storymap.sherlockouo.com/chat/";

let socket = io(url,{autoConnect: false});

export default socket;



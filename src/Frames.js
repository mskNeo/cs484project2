function Frames(ip, sub) {
  const url = (ip, sub) => `ws://${ip}:8888${sub}`;

  const framesObj = {
    socket: null,

    start: () => {
      framesObj.socket = new WebSocket(url(ip, sub));
      framesObj.socket.onmessage = function(event) {
        framesObj.show(JSON.parse(event.data));
      }
    },

    show: frame => console.log(frame),
  }

  return framesObj
}

export default Frames;
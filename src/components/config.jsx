const prod = false; 
export default {
  mcontent: {
    back: {
      host: prod ? '' : 'http://127.0.0.1',
      port: prod ? 0 : 3020,
    }
  },
}

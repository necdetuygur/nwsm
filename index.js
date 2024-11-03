const sendMessage = require("./lib/nSendMessage");
const args = process.argv.slice(2);

(async () => {
  await sendMessage(args[0], args[1]);
})();

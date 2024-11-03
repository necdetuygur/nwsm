const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const sendMessage = async (phoneNumber, message) => {
  const client = new Client({
    authStrategy: new LocalAuth({
      clientId: "client1",
      dataPath: "./sessions",
    }),
    puppeteer: {
      // headless: false,
      // args: ["--disable-dev-shm-usage"],
    },
  });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
    console.log("QR kodunu tarayın.");
  });

  client.on("authenticated", () => {
    console.log("Kimlik doğrulama başarılı!");
  });

  client.on("ready", async () => {
    console.log("WhatsApp Web Client hazır!");
    const chatId = phoneNumber + "@c.us";
    try {
      const response = await client.sendMessage(chatId, message);
      console.log("Mesaj gönderildi:", response);
    } catch (error) {
      console.error("Mesaj gönderilemedi:", error);
    }

    setTimeout(async () => {
      await client.destroy();
      console.log("İstemci kapatıldı, programdan çıkılıyor...");
      process.exit(0);
    }, 5e3);
  });

  client.on("auth_failure", (msg) => {
    console.error("Kimlik doğrulama hatası:", msg);
  });

  client.on("disconnected", (reason) => {
    console.log("Bağlantı kesildi, sebep:", reason);
  });

  client.initialize();
};

module.exports = sendMessage;

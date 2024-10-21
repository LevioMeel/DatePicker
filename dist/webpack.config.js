const path = require("path");

module.exports = {
  entry: "./src/index.js", // Входной файл вашего приложения
  output: {
    path: path.resolve(__dirname, "dist"), // Папка для собранных файлов
    filename: "bundle.js", // Имя собранного файла
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Поддержка файлов с расширениями .js и .jsx
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Используем babel-loader для обработки JavaScript и JSX
        },
      },
      {
        test: /\.css$/, // Для подключения CSS файлов
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Поддержка импорта без указания расширений .js и .jsx
  },
  devServer: {
    static: "./dist", // Сервер будет раздавать файлы из папки dist
    port: 3000, // Порт, на котором будет запущен сервер
  },
  mode: "development", // Устанавливаем режим разработки
};

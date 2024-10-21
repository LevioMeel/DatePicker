import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";

//DatePicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./styles.css"; // Импортируем наш CSS файл

function DateBlock() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  //Сбрасывает фильтр времени
  document.querySelector(".date-choose__back").addEventListener("click", () => {
    document.querySelector(".date-choose").classList.remove("active");

    document.querySelector(".box__chosed-date").textContent =
      "Выберите нужный диапозон";
    setStartDate(new Date());
    setEndDate(null);
  });

  //Обновляет значение в фильтре
  document.querySelector(".date-choose__add").addEventListener("click", () => {
    let startDateFormat;
    let endDateFormat;
    if (!startDate && !endDate) return;
    if (startDate && endDate) {
      startDateFormat = new Date(startDate);
      endDateFormat = new Date(endDate);
    } else {
      startDateFormat = new Date(startDate);
      endDateFormat = new Date(startDate);
    }

    const dateRange = formatDateRange(startDateFormat, endDateFormat);
    document.querySelector(".box__chosed-date").textContent = dateRange;

    console.log(dateRange);
  });

  //Делает выбранный диапазон активным
  function setDate(days) {
    const today = new Date(); // Текущая дата
    const lastWeek = new Date(today); // Копируем текущую дату
    lastWeek.setDate(today.getDate() - days); // Устанавливаем дату на 7 дней назад

    setStartDate(lastWeek);
    setEndDate(today);
  }
  const handleLast7Click = () => {
    console.log("work");
    setDate(6);
  };

  const handleLast30Click = () => {
    setDate(29);
  };

  const handleLast90Click = () => {
    setDate(89);
  };

  const handleYesterdayClick = () => {
    const today = new Date(); // Текущая дата
    const lastWeek = new Date(today); // Копируем текущую дату
    lastWeek.setDate(today.getDate() - 1); // Устанавливаем дату на 7 дней назад

    setStartDate(lastWeek);
    setEndDate(lastWeek);
  };

  const handleTodayClick = () => {
    const today = new Date(); // Текущая дата

    setStartDate(today);
    setEndDate(today);
  };
  const handleBeginningClick = () => {
    setDate(320);
  };
  useEffect(() => {
    const last7Element = document.querySelector(".last-7");
    const last30Element = document.querySelector(".last-30");
    const last90Element = document.querySelector(".last-90");
    const yesterdayElement = document.querySelector(".yesterday");
    const todayElement = document.querySelector(".today");
    const beginningElement = document.querySelector(".beginning");

    last7Element.addEventListener("click", handleLast7Click);
    last30Element.addEventListener("click", handleLast30Click);
    last90Element.addEventListener("click", handleLast90Click);
    yesterdayElement.addEventListener("click", handleYesterdayClick);
    todayElement.addEventListener("click", handleTodayClick);
    beginningElement.addEventListener("click", handleBeginningClick);
  }, []);

  // //События--------------------------------------
  // const handleLast7Click = () => {
  //   console.log(7);
  //   setDate(6);
  //   document
  //     .querySelector(".last-7")
  //     .removeEventListener("click", handleLast7Click);
  // };

  // const handleLast30Click = () => {
  //   console.log(30);
  //   setDate(29);
  //   document
  //     .querySelector(".last-30")
  //     .removeEventListener("click", handleLast30Click);
  // };

  // const handleLast90Click = () => {
  //   console.log(90);
  //   setDate(89);
  //   document
  //     .querySelector(".last-90")
  //     .removeEventListener("click", handleLast90Click);
  // };

  // const handleYesterdayClick = () => {
  //   console.log("yest");
  //   const today = new Date(); // Текущая дата
  //   const lastWeek = new Date(today); // Копируем текущую дату
  //   lastWeek.setDate(today.getDate() - 1); // Устанавливаем дату на 7 дней назад

  //   setStartDate(lastWeek);
  //   setEndDate(lastWeek);

  //   document
  //     .querySelector(".yesterday")
  //     .removeEventListener("click", handleYesterdayClick);
  // };
  // const handleTodayClick = () => {
  //   console.log("tod");

  //   const today = new Date(); // Текущая дата

  //   setStartDate(today);
  //   setEndDate(today);

  //   document
  //     .querySelector(".today")
  //     .removeEventListener("click", handleTodayClick);
  // };
  // const handleBeginningClick = () => {
  //   console.log("begin");

  //   setDate(320);

  //   document
  //     .querySelector(".beginning")
  //     .removeEventListener("click", handleBeginningClick);
  // };
  // //События--------------------------------------

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log("Changed");
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      monthsShown={3}
      selectsRange
      inline
    />
  );
}

function formatDate(date) {
  if (!date) return;

  const day = String(date.getDate()).padStart(2, "0"); // Получаем день и добавляем ноль в начале, если нужно
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Получаем месяц (0-11) и добавляем 1, затем добавляем ноль
  const year = date.getFullYear(); // Получаем год

  return `${day}.${month}.${year}`; // Возвращаем строку в формате ДД.ММ.ГГГГ
}

function formatDateRange(startDate, endDate) {
  const formattedStart = formatDate(startDate); // Форматируем начальную дату
  const formattedEnd = formatDate(endDate); // Форматируем конечную дату

  return `${formattedStart} - ${formattedEnd}`; // Формируем диапазон дат
}

//Выводит панель выбора даты
document.querySelector(".box__choose-date").addEventListener("click", () => {
  document.querySelector(".date-choose").classList.toggle("active");
});

const root = createRoot(document.getElementById("root"));
root.render(<DateBlock />);

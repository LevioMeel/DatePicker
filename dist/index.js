document.addEventListener("DOMContentLoaded", () => {
  //Создание папки в popup
  document
    .querySelector(".btn-create-folder-pop")
    .addEventListener("click", () => {
      const container = document.querySelector(".search__folders-wrap");
      const nameFolder = document.querySelector(".add-folder-name").value;
      if (!nameFolder) return;

      container.insertAdjacentHTML(
        "beforeend",
        `
          <div class="folder" data-visible="false">
            <div class="folder__btn btn-reset">
              <span>${nameFolder}</span>
            </div>
          </div>
        `
      );
      const folders = document
        .querySelector(".search-projects-menu")
        .querySelectorAll(".folder");

      document.querySelector(".select-project-btn").textContent =
        folders[folders.length - 1].textContent;
      document
        .querySelector(".search-projects-menu")
        .classList.remove("active");
      document.querySelector(".select-project-btn").style.borderColor =
        "#e5e5ea";
      folders[folders.length - 1].addEventListener("click", (e) => {
        document.querySelector(".select-project-btn").textContent =
          e.target.textContent;
        document
          .querySelector(".search-projects-menu")
          .classList.remove("active");
        document.querySelector(".select-project-btn").style.borderColor =
          "#e5e5ea";
      });
    });

  // ------------------------------------------------------------ Пример отправки формы
  const form = document.getElementById("project-form-auto-f");
  const form2 = document.getElementById("project-form-auto-t");
  const form3 = document.getElementById("project-form-new-project");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("submit  1");

    document.querySelector(".gui-switch-popup").style.display = "none";

    document.querySelector(".project-form-auto-f").classList.remove("active");
    document.querySelector(".project-form-auto-t").classList.remove("active");
    document.querySelector(".project-form-new-project").classList.add("active");
  });

  form2.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("submit  2");

    document.querySelector(".gui-switch-popup").style.display = "none";

    document.querySelector(".project-form-auto-f").classList.remove("active");
    document.querySelector(".project-form-auto-t").classList.remove("active");
    document.querySelector(".project-form-new-project").classList.add("active");
  });

  form3.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("submit  3");

    document.querySelector(".accept-popup").classList.add("active");
    document.querySelector(".pop-project__sure").style.display = "none";
    document.querySelector(".pop-project__sub").style.display = "none";
    document
      .querySelector(".project-form-new-project")
      .classList.remove("active");
  });
  //  Пример отправки формы  ------------------------------------------------------------

  //Тип формы в popup. Auto -> true, false
  document.querySelector(".pop-variable").addEventListener("click", (e) => {
    const form1 = document.querySelector(".project-form-auto-f");
    const form2 = document.querySelector(".project-form-auto-t");
    if (e.target.checked === true) {
      form1.classList.remove("active");
      form2.classList.add("active");
    } else {
      form2.classList.remove("active");
      form1.classList.add("active");
    }
  });

  //Вывод кнопки создания папки в popup
  document.querySelector(".btn-new-folder").addEventListener("click", (e) => {
    const input = document.querySelector(".add-folder");
    input.classList.add("active");
    document.querySelector(".btn-new-folder").classList.remove("active");
  });

  //Закрыть popup
  const handlerclosePopup = () => {
    const closeButtons = document.querySelectorAll(".pop-project__exit-button");

    closeButtons.forEach((el) => {
      el.addEventListener("click", () => {
        document.querySelector(".popup-background").classList.remove("active");
      });
    });

    //Отлавлием клик вне popup для его закрытия
    document.addEventListener("click", (event) => {
      if (event.target === document.querySelector(".popup-background")) {
        document.querySelector(".popup-background").classList.remove("active");
      }
    });
  };
  handlerclosePopup();

  //Открыть popup
  document
    .querySelector(".open-popup-new-poject")
    .addEventListener("click", () => {
      document.querySelector(".popup-background").classList.add("active");
    });

  //------------------------------------- POSITIONS

  // const hideDay = () => {

  // }

  //-------- Функционал выбора позиций для их удаления
  let itemPosActiveCount = 0;
  //Чекбоксы отдельных позиций
  const itemsEvent = () => {
    const allItems = document.querySelectorAll(".item-pos");
    const button = document.querySelector(".all-positions");

    allItems.forEach((el) => {
      const input = el.querySelector("input");
      input.addEventListener("click", () => {
        input.checked ? itemPosActiveCount++ : itemPosActiveCount--;
        button.checked = false;
        positionsState(deleteButton, deleteCount, wrap);
      });
    });
  };
  //Общий чекбокс
  const choseAllPositions = () => {
    const allItems = document.querySelectorAll(".item-pos");
    const button = document.querySelector(".all-positions");

    button.addEventListener("click", (e) => {
      allItems.forEach((el) => {
        const input = el.querySelector("input");
        input.checked = button.checked;
        button.checked
          ? (itemPosActiveCount = allItems.length)
          : (itemPosActiveCount = 0);

        positionsState(deleteButton, deleteCount, wrap);
      });
    });
  };
  const deleteButton = document.querySelector(".pos-pag__delete");
  const deleteCount = document.querySelector(".pos-pag__delete-count");
  const wrap = document.querySelector(".pos-pag__wrap");
  const positionsState = (deleteButton, deleteCount, wrap) => {
    itemPosActiveCount > 0
      ? (deleteButton.style.display = "flex")
      : (deleteButton.style.display = "none");

    itemPosActiveCount > 0
      ? (wrap.style.justifyContent = "flex-end")
      : (wrap.style.justifyContent = "space-between");
    deleteCount.textContent = itemPosActiveCount;
  };
  // Функционал выбора позиций для их удаления --------

  choseAllPositions();
  itemsEvent();

  //Сокращенный вид
  const shortPositions = () => {
    const checkbox = document
      .querySelector(".settings__cut")
      .querySelector("input");
    const positions = document.querySelector(".positions");
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        return positions.classList.add("positions--short");
      }
      return positions.classList.remove("positions--short");
    });
  };
  shortPositions();

  //Показать меню сортировки у дат
  document.querySelector(".header-pos").addEventListener("click", (event) => {
    const item = event.target.closest(".header-pos__date");
    const dropClicked =
      event.target.classList.contains("project__dropdown-wrapper") ||
      event.target.classList.contains("pos-pag__variable");

    //Клик по дате
    if (item && !dropClicked) {
      const countPages = () => {
        const t = item;
        var e = t.querySelector(".header-pos__date-button");
        let r = !1;
        const c = () => {
          t.classList.remove("active"), (r = !1);
        };
        t.classList.toggle("active"), (r = !r);
        window.addEventListener("click", (e) => {
          r && !t.contains(e.target) && c();
        }),
          window.addEventListener("keydown", (e) => {
            r && "Escape" === e.key && c();
          });
      };
      countPages();
    }
  });

  //POSITIONS -------------------------------------

  document.querySelector(".burger").addEventListener("click", (el) => {
    document.querySelector(".content").style.width = "calc(100% - 318px)";
    console.log("ww1");
  });
  document.querySelector(".cl").addEventListener("click", (el) => {
    console.log("ww2");

    document.querySelector(".content").style.width = "calc(100% - 76px)";
  });
});

// data - атрибут + класс

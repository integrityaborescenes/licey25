import { API_URL } from "./src/config.ts";

document.addEventListener("DOMContentLoaded", async () => {
  // ==========================
  //  1. Конфигурация
  // ==========================
  const PIN_URL = `${API_URL}/api/wait_mode`; // URL, откуда берем PIN
  const EXIT_URL = "http://localhost:1722"; // URL выхода из приложения
  const TIMER = 3000; // Удержание кнопки для вызова модалки

  let PIN = null; // Здесь будет храниться PIN с сервера
  let timerId = null;

  // ==========================
  //  2. Функция загрузки PIN
  // ==========================
  async function loadPin() {
    try {
      const response = await fetch(PIN_URL);
      const data = await response.json();
      PIN = data.pinCode; // Сохраняем PIN
      console.log("PIN загружен:", PIN);
    } catch (err) {
      console.error("Ошибка загрузки PIN:", err);
    }
  }

  await loadPin(); // Загружаем PIN перед запуском всего остального

  // ==========================
  //  3. UI функции
  // ==========================
  const BODY = document.querySelector("body");

  function showModal() {
    document.querySelector("#exiter-modal").style.display = "flex";
  }

  function hideModal() {
    document.querySelector("#exiter-modal").style.display = "none";
    const input = document.querySelector("#headerModalInput");
    input.value = "";
    input.style.borderColor = "#00ABEB"; // сброс цвета
  }

  function buttonPressed() {
    timerId = setTimeout(showModal, TIMER);
  }

  function buttonReleased() {
    clearTimeout(timerId);
  }

  // ==========================
  //  4. Проверка PIN и выход
  // ==========================
  function exitTab(url) {
    const input = document.querySelector("#headerModalInput");

    if (!PIN) {
      console.error("PIN ещё не загружен с сервера");
      return;
    }

    if (input.value != PIN) {
      input.style.borderColor = "red";
      return;
    }

    fetch(url, { method: "GET" })
      .then((r) => r.json())
      .then((data) => console.log("Ответ выхода:", data))
      .catch((err) => console.error("Ошибка выхода:", err));
  }

  // ==========================
  //  5. Утилиты создания кнопок
  // ==========================
  function createBtn(config) {
    const btn = document.createElement("button");
    Object.assign(btn.style, config.styles);

    if (config.text) btn.innerHTML = config.text;

    if (config.listeners) {
      config.listeners.forEach((e) =>
        btn.addEventListener(e.listener, e.callback),
      );
    }

    return btn;
  }

  // ==========================
  //  6. UI Конфиги
  // ==========================
  const BASE_BTN_CONFIG = {
    styles: {
      width: "100%",
      height: "70px",
      border: "none",
      padding: "0px",
      margin: "0px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "20px",
      fontSize: "20px",
      color: "white",
      fontWeight: "600",
      fontFamily: "sans-serif",
    },
  };

  const EXIT_BTN_CONFIG = {
    styles: {
      width: "100px",
      height: "100px",
      position: "fixed",
      top: "0px",
      left: "0px",
      border: "none",
      background: "transparent",
      padding: "0px",
      margin: "0px",
      zIndex: "9999",
    },
    listeners: [
      { listener: "mousedown", callback: buttonPressed },
      { listener: "touchstart", callback: buttonPressed },
      { listener: "mouseup", callback: buttonReleased },
      { listener: "touchend", callback: buttonReleased },
    ],
  };

  const CONFIRM_BTN_CONFIG = {
    styles: {
      ...BASE_BTN_CONFIG.styles,
      background: "#41AE59",
    },
    text: "Подтвердить",
    listeners: [
      { listener: "click", callback: () => exitTab(EXIT_URL) },
      { listener: "touch", callback: () => exitTab(EXIT_URL) },
    ],
  };

  const CANCEL_BTN_CONFIG = {
    styles: {
      ...BASE_BTN_CONFIG.styles,
      background: "#00ABEB",
    },
    text: "Назад",
    listeners: [
      { listener: "click", callback: hideModal },
      { listener: "touch", callback: hideModal },
    ],
  };

  // ==========================
  //  7. Создание модалки
  // ==========================
  function createModal() {
    const modal = document.createElement("div");
    const header = document.createElement("div");
    const footer = document.createElement("div");

    modal.id = "exiter-modal";

    Object.assign(modal.style, {
      width: "370px",
      display: "none",
      gap: "20px",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      position: "absolute",
      zIndex: "9999",
      top: "30px",
      left: "50%",
      transform: "translateX(-50%)",
    });

    Object.assign(header.style, {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      padding: "32px",
      borderRadius: "40px",
      background: "#f3f6f4",
    });

    Object.assign(footer.style, {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      padding: "32px 45px",
      borderRadius: "40px",
      background: "#f3f6f4",
      boxSizing: "border-box",
    });

    const title = document.createElement("div");
    title.innerHTML = "Введите пин-код";
    Object.assign(title.style, {
      textAlign: "center",
      fontSize: "24px",
      fontFamily: "sans-serif",
      color: "#000000",
    });

    const input = document.createElement("input");
    input.id = "headerModalInput";
    Object.assign(input.style, {
      textAlign: "center",
      fontSize: "30px",
      fontFamily: "sans-serif",
      color: "#000000",
      border: "1px solid #00ABEB",
      borderRadius: "20px",
      height: "70px",
      pointerEvents: "none",
    });

    header.appendChild(title);
    header.appendChild(input);

    modal.appendChild(header);
    modal.appendChild(footer);

    return { modal, footer, header };
  }

  const { modal, footer, header } = createModal();

  // ==========================
  //  8. Цифровые кнопки
  // ==========================
  function onNumberClick() {
    const input = document.querySelector("#headerModalInput");
    input.value += this.innerHTML;
    input.style.borderColor = "#00ABEB";
  }

  function onDeleteClick() {
    const input = document.querySelector("#headerModalInput");
    input.value = input.value.slice(0, -1);
    input.style.borderColor = "#00ABEB";
  }

  const BASE_NUMBER_CONFIG = {
    styles: {
      width: "80px",
      height: "80px",
      border: "none",
      padding: "0px",
      margin: "0px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "20px",
      fontSize: "20px",
      color: "#203482",
      fontFamily: "sans-serif",
      background: "#00ABEB0D",
    },
    listeners: [
      { listener: "click", callback: onNumberClick },
      { listener: "touch", callback: onNumberClick },
    ],
  };

  function createNumbers() {
    const arr = [];
    for (let i = 0; i <= 9; i++) {
      const btn = createBtn(BASE_NUMBER_CONFIG);
      btn.innerHTML = i;
      arr.push(btn);
    }
    // Перемещаем 0 в конец
    arr.push(arr.shift());
    return arr;
  }

  // DELETE кнопка
  const BASE_DELETE_CONFIG = {
    styles: {
      ...BASE_NUMBER_CONFIG.styles,
      width: "160px",
      flexGrow: "1",
      background:
        "#00ABEB0D url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAA0CAYAAACaRVbnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASgSURBVHgB7ZzPThNBHMd/M93qwZisN8XEzCNgBONJW30A4QmEJ6AcjSndAsYj+ASFJ0Bv3ig3IhDqE7gnzo3RxMTdjjOzLdCd2f/NdjaZT0Igsw3Q/e58Z37fmSmCGUCWPy6C7y8CBhuA2mAIgYZAkQsYu+7Zh4F0FQogbj4d7bEb3wBDStAALGvVPX3vTlpqkBPyfPcdE+Ab/xEMWXgIo1HLXngNw6vjE96QqyeQFw4BD/8EQ0FQ0z1v9zHkwcfHYCgOoj3xDTJClnY6bAxwQs1D9tUFq/4FDDL+iE1W2MQFoAM0bN+omUmESBtCsO6ebR2AIRb2ADfYAxx2kc1sdqSyIYQPjAAp8fyB3Ejt1CKQ5Z0NqSshcKFW64IhFe7AGaraU4kgbIhK4wCne3u+a8iHlepVPmaDMYQqYdR3z9oHYChMYk8gy9trzIbWpAuWtQ6GmRArgrAhPq2SoMaGZki8HXEbUgzG7lnHgRIRUzsKtnvRLlSHkIZjwy+8AnfqfZ0eosieEGlDtXoTSmRcHB6z6vKILO/2ICeiV//Bl+wd98D7dynCR01QiiCeGA1sSKrO6WgtjxBCAF7j3PRqG6h/rIsQ6p7wO8KGzsu1IcaK1JJRCIUAE/jaxwZogCTC+OloSa+kaA6zIXqobk4nRIwAAYh+BQ1Q9AT/SGqi9DOPXKFk3POtfW6ByosJQiQLwPKu720tAscpEYQHq6KJ+p19mBOBBWYTIpUAGuVd1yIENYGe0UQWIaomAOd6edN+9PoSwtGESEjbWgR0w6t+315osOgdNeSrdNF+/IbYT17+0F0Ae6HphJpORE+ItCHNEtKkHiHWOirUAyZgnW1IRawQUWi+6ITHCek0mi/UZBKiAqt+mHVfuSCqwEKNEIJNnWNfVJFlVy6CvNrjeQQ0R9goRm/jX4VfQQXArGqUq1JEe2TR0XY7Y+I0dELOrKlsMHh0X8yEbsPfXF0xVmhAagEmVEAILBafVbkQhVawRUMfkgVA6hhCcyFEnSByIdUgp5EtpaqEz9urebOmeXKTHfmsVlDZkoVaMGeyRBF5sqZ5cy1CpC0B6sxz8SNPFlQ1IaZS1CCuVviqOINQPkXCuCoJIa8neD7vDaHagTbI0nb5tuTVekWyoEQhlroOaIAkwnirnuof75AXnwjoQIZKOF4I0GLSoVxjDla0UD/UbLNKutwujPAmhHtljihCKQRCA7ivDC5LJ3rzlzV/WxKH7FCtOZ61DYtkQdNCsAfsnt90++oNumWD4i6Ob3h4UB6CVX9adszNt+HM4qbN6vfk/vtL23S6hXZjt0HG2FLps6VZ3Thdnv7bJG+ND2wpBF0hz3ZWwDATEkVwTx1XObvAdE/npLVKpDokIga1CiWtVSP9mbWKJK1VJLUIVUhadScqg8t4epMaWyqEL29AxniAICMRZ3GDCpSOtNhgqyd8vVvxQSze6EFmETjkWZctiSIttpVXGr7R+qLTyvnZFgpbMmSD379xdpVLBJG01kZN8dk9hhywFKJWv86uctnRbYKzbdyaqDZnwPSF3XxED8MhZGERJohzbn/vmqlqBHGB539so3FWVGYqQQAAAABJRU5ErkJggg==) center / 40px no-repeat",
    },
    listeners: [
      { listener: "click", callback: onDeleteClick },
      { listener: "touch", callback: onDeleteClick },
    ],
  };

  // ==========================
  //  9. Сборка UI
  // ==========================
  const exitBtn = createBtn(EXIT_BTN_CONFIG);
  const confirmBtn = createBtn(CONFIRM_BTN_CONFIG);
  const cancelBtn = createBtn(CANCEL_BTN_CONFIG);
  const deleteBtn = createBtn(BASE_DELETE_CONFIG);
  const numberBtns = createNumbers();

  BODY.appendChild(exitBtn);
  BODY.appendChild(modal);

  numberBtns.forEach((btn) => footer.appendChild(btn));
  footer.appendChild(deleteBtn);

  header.appendChild(confirmBtn);
  header.appendChild(cancelBtn);
});

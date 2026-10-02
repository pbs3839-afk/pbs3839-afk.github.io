const today = new Date();
const days = ["일", "월", "화", "수", "목", "금", "토"];

document.querySelector(".Header > h1").textContent =
  `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${days[today.getDay()]}요일`;
let mockData = [
  { id: 0, isDone: false, content: "React study", date: Date.now() },
  { id: 1, isDone: true, content: "친구 만나기", date: Date.now() },
  { id: 2, isDone: false, content: "낮잠 자기", date: Date.now() }
];

const initData = (printData) => {
  const wrapper = document.querySelector(".todos_wrapper");
  wrapper.innerHTML = "";

  printData.forEach((todo) => {
    const item = document.createElement("div");
    item.className = "TodoItem";
    item.dataset.id = todo.id;

    item.innerHTML = `
      <input type="checkbox" ${todo.isDone ? "checked" : ""}>
      <span class="content"></span>
      <span class="date">
        ${new Date(todo.date).toLocaleDateString("ko-KR")}
      </span>
      <button type="button">삭제</button>
    `;

    item.querySelector(".content").textContent = todo.content;
    wrapper.append(item);
  });
};

initData(mockData);


let idIndex = 3;

document.querySelector(".Editor").addEventListener("submit", (event) => {
  event.preventDefault();

  const input = document.querySelector("#todo-input");
  const content = input.value.trim();

  if (content === "") {
    input.focus();
    return;
  }

  mockData.push({
    id: idIndex++,
    isDone: false,
    content: content,
    date: Date.now()
  });

  initData(mockData);

  input.value = "";
  input.focus();
});
document.querySelector(".todos_wrapper").addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const item = button.closest(".TodoItem");
  const targetId = Number(item.dataset.id);

  mockData = mockData.filter((todo) => todo.id !== targetId);

  initData(mockData);
});
document.querySelector(".todos_wrapper").addEventListener("change", (event) => {
  if (!event.target.matches('input[type="checkbox"]')) {
    return;
  }

  const item = event.target.closest(".TodoItem");
  const targetId = Number(item.dataset.id);

  mockData = mockData.map((todo) => {
    if (todo.id === targetId) {
      return { ...todo, isDone: event.target.checked };
    }

    return todo;
  });

  initData(mockData);
});

function getFilterData(search) {
  const keyword = search.trim().toLowerCase();

  return mockData.filter((todo) =>
    todo.content.toLowerCase().includes(keyword)
  );
}

function renderTodos() {
  const search = document.querySelector("#keyword").value;
  initData(getFilterData(search));
}

document.querySelector("#keyword").addEventListener("input", renderTodos);
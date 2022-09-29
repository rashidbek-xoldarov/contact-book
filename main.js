const elForm = document.querySelector(".site-form");
const elList = document.querySelector(".card-list");
const elInputName = document.querySelector(".js-input-name");
const elInputRel = document.querySelector(".js-input-rel");
const elInputTel = document.querySelector(".js-input-tel");

const data = [];

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const valName = elInputName.value;
  const valRel = elInputRel.value;
  const valTel = elInputTel.value;

  let obj = {
    id: data.length,
    name: valName,
    reletion: valRel,
    tel: valTel,
  };

  const item = data.find((item) => item.tel == valTel);

  if (item) {
    alert(`This ${item.tel} is entered.Please enter another tel`);
  }

  if (valName && valRel && valTel !== "" && !item) {
    data.push(obj);
    renderUi(data);
  }

  elInputName.value = "";
  elInputRel.value = "";
  elInputTel.value = "";
});

function renderUi(arr) {
  elList.textContent = "";
  arr.forEach((item) => {
    //create Element
    const newLi = document.createElement("li");
    const title = document.createElement("h3");
    const text = document.createElement("p");
    const link = document.createElement("a");
    const delBtn = document.createElement("button");

    //set Atribute
    title.textContent = item.name;
    text.textContent = item.reletion;
    link.textContent = item.tel;
    link.href = `tel: ${item.tel}`;
    delBtn.dataset.delId = item.id;
    delBtn.textContent = "Delete";
    newLi.setAttribute("class", "card-item");
    title.setAttribute("class", "card-item-title");
    text.setAttribute("class", "card-text");
    link.setAttribute("class", "card-link");
    delBtn.setAttribute("class", "card-btn");

    //Appendchild

    newLi.appendChild(title);
    newLi.appendChild(text);
    newLi.appendChild(link);
    newLi.appendChild(delBtn);

    elList.appendChild(newLi);

    delBtn.addEventListener("click", deleteCard);
  });
}

function deleteCard(evt) {
  const delId = evt.target.dataset.delId;

  const index = data.findIndex((item) => item.id == delId);

  const deletedArr = data.splice(index, 1);
  renderUi(data);
}

const elForm = document.querySelector(".site-form");
const elList = document.querySelector(".card-list");
const elInputName = document.querySelector(".js-input-name");
const elInputRel = document.querySelector(".js-input-rel");
const elInputTel = document.querySelector(".js-input-tel");
const elInputImg = document.querySelector(".js-input-img");

const img = document.querySelector("img");

const data = [];
let src;
elInputImg.addEventListener("change", (evt) => {
  if (evt.target.files.length > 0) {
    src = URL.createObjectURL(evt.target.files[0]);
  }
});

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  console.log(src);
  const valName = elInputName.value;
  const valRel = elInputRel.value;
  const valTel = elInputTel.value;

  let obj = {
    id: data.length,
    name: valName,
    reletion: valRel,
    tel: valTel,
    url: src,
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
    const fistWrapper = document.createElement("div");
    const secondWrapper = document.createElement("div");
    const text = document.createElement("p");
    const link = document.createElement("a");
    const delBtn = document.createElement("button");
    const img = document.createElement("img");

    //set Atribute
    title.textContent = item.name;
    text.textContent = item.reletion;
    link.textContent = item.tel;
    link.href = `tel: ${item.tel}`;
    delBtn.dataset.delId = item.id;
    delBtn.textContent = "Delete";
    img.src = `${item.url}`;
    img.width = "60";
    img.height = "60";
    img.style.borderRadius = "50%";
    newLi.setAttribute("class", "card-item");
    title.setAttribute("class", "card-item-title");
    text.setAttribute("class", "card-text");
    link.setAttribute("class", "card-link");
    delBtn.setAttribute("class", "card-btn");

    //Appendchild

    fistWrapper.appendChild(img);
    fistWrapper.appendChild(delBtn);
    secondWrapper.appendChild(title);
    secondWrapper.appendChild(text);
    secondWrapper.appendChild(link);
    newLi.appendChild(fistWrapper);
    newLi.appendChild(secondWrapper);

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

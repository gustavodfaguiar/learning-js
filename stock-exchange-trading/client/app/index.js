var campos = [
  document.querySelector("#data"),
  document.querySelector("#valor"),
  document.querySelector("#quantidade")
];

console.log(campos);

var tbody = document.querySelector("table tbody");

document.querySelector(".form").addEventListener("submit", function(event) {
  var tr = document.createElement("tr");

  campos.forEach(function(campo) {
    var td = document.createElement("td");
    td.textContent = campo.value;
    tr.appendChild(td);
  });

  var tdVolume = document.createElement("td");
  tdVolume.textContent = campos[1].value * campos[2].value;
  tr.appendChild(tdVolume);

  tbody.appendChild(tr);
});
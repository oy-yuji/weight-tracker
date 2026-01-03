//Add a weight
document.getElementById("submitWeightBtn").addEventListener("click", addWeight);

async function addWeight() {
  let weight = document.getElementById("weight").value;
  const date = new Date().toISOString();
  const { data, error } = await supabasePublicClient
    .from("weights")
    .insert([{ date: date, weight: weight, run: FALSE, strength: FALSE }])
    .select();

  if (error) {
    console.error(error);
  }

  document.getElementById("weight").value = "";
}

//Display Table
readWeights();
async function readWeights() {
  let { data: weights, error } = await supabasePublicClient
    .from("weights")
    .select("*");

  const tableBody = document.querySelector("#weightTbl tbody");

  weights.forEach(addRow);

  function addRow(data) {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${data.date}</td>
    <td>${data.weight}</td>
    <td>
    <input type="checkbox" id="runCheckBox" name="runCheckbox" />
    ${data.run}
    </td>
    <td>
      <input type="checkbox" id="strengthCheckBox" name="strengthCheckbox" />
    ${data.strength}</td>
  `;

    tableBody.appendChild(row);
  }
}

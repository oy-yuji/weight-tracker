//Add a weight
document.getElementById("submitWeightBtn").addEventListener("click", addWeight);

async function addWeight() {
  let weight = document.getElementById("weight").value;
  const date = new Date().toISOString();
  const { data, error } = await supabasePublicClient
    .from("weights")
    .insert([{ date: date, weight: weight, run: false, strength: false }])
    .select();

  if (error) {
    console.error(error);
  }
  window.location.reload();
  document.getElementById("weight").value = "";
}

//Display Table

async function readWeights() {
  let { data: weights, error } = await supabasePublicClient
    .from("weights")
    .select("*");

  const tableBody = document.querySelector("#weightTbl tbody");
  tableBody.innerHTML = ""; // Clear old rows

  weights.forEach(addRow);

  function addRow(data) {
    const row = document.createElement("tr");
    const utcDate = new Date(data.date);

    // Create a local date from the UTC year/month/day to avoid timezone shift
    const localDate = new Date(
      utcDate.getUTCFullYear(),
      utcDate.getUTCMonth(),
      utcDate.getUTCDate()
    );

    const localDateStr = localDate.toLocaleDateString();
    row.innerHTML = `
      <td>${localDateStr}</td>
      <td>${data.weight}</td>
      <td><input type="checkbox" class="runCheckbox" ${
        data.run ? "checked" : ""
      }></td>
      <td><input type="checkbox" class="strengthCheckbox" ${
        data.strength ? "checked" : ""
      }></td>
      <td><button class="deleteBtn">Delete</button></td>
    `;
    tableBody.appendChild(row);

    const runCheckbox = row.querySelector(".runCheckbox");
    const strengthCheckbox = row.querySelector(".strengthCheckbox");
    runCheckbox.addEventListener("change", () => {
      updateCheckBox(data.id, "run", runCheckbox.checked);
    });

    strengthCheckbox.addEventListener("change", () => {
      updateCheckBox(data.id, "strength", strengthCheckbox.checked);
    });

    const deleteBtn = row.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", async () => {
      const confirmed = confirm("Are you sure you want to delete this entry?");
      if (!confirmed) return;

      const { data: deletedData, error } = await supabasePublicClient
        .from("weights")
        .delete()
        .eq("id", data.id);

      if (error) {
        console.error("Delete error:", error);
        alert("Failed to delete the entry.");
      } else {
        await readWeights(); // Refresh table after delete
      }
    });
  }
}

//Update Check Boxes

async function updateCheckBox(id, column, value) {
  const { data, error } = await supabasePublicClient
    .from("weights")
    .update({ [column]: value })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
  }
}

readWeights();
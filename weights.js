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
    document.getElementById("loadedPassword").innerText =
      "Error connecting to Supabase";
    return;
  }
}

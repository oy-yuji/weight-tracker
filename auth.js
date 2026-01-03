
//Check password
document.getElementById("submitBtn").addEventListener("click", checkPassword);

async function checkPassword() {
  const { data, error } = await supabasePublicClient
    .from("passwords")
    .select("*")
    .limit(1);

  if (error) {
    console.error(error);
    document.getElementById("loadedPassword").innerText =
      "Error connecting to Supabase";
    return;
  }

  let correctPassword = data[0].password;
  let inputtedPassword = document.getElementById("password").value;

  if (inputtedPassword === correctPassword) {
    window.location.href = "weight-input.html";
  } else {
    alert("Incorrect password");
  }
}

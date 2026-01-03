const supabasePublicClient = supabase.createClient(
  "https://whkiqqjbxcyqszuzjtrq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indoa2lxcWpieGN5cXN6dXpqdHJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczODkxNjMsImV4cCI6MjA4Mjk2NTE2M30.-4TNSHWUjMS2GXSE_DX9XeQGVp7crBc50KdMqS_Xce0"
);

let { data: passwords, error } = await supabase
  .from('passwords')
  .select('*')

  let loadedPassword = document.getElementById(loadedPassword);
  
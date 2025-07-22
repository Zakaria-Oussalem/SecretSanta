async function createSession(username, role) {
  const response = await fetch("http://127.0.0.1:8000/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      username: username,
      role: role,
    }),
  });
  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error(data.detail || "An unexpected error occurred");
  }

  return {
    session_id: data.session,
    user_id: data.id,
  };
}

async function joinSession(session_id, username) {
  const response = await fetch("http://127.0.0.1:8000/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      session_id: session_id,
      username: username,
      role: "user",
    }),
  });
  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error(data.detail || "An unexpected error occurred");
  }

  return {
    user_id: data.id,
  };
}

export { createSession, joinSession };

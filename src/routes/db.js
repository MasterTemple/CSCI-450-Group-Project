
export async function req(endpoint, data, authToken) {
	// body["authToken"] = authToken;
	const body = {
		"authToken": authToken,
		"data": data,
	};
	const server = "http://127.0.0.1:5000";
	const res = await fetch(server + "/" + endpoint, {
		method: "POST",
		body: JSON.stringify(body),
		// mode: "no-cors",
		headers: {
			"Access-Control-Allow-Origin": server,
			"Content-Type": "application/json",
		},
	});
	const json = await res.json();
	return json;
}
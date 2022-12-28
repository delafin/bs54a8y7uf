export const useFetch = () => {
	const request = async (
		url: string,
		method?: string,
		body?: null | string,
		headers = { 'Content-Type': 'application/json' }
	): Promise<UserList> => {
		try {
			const response = await fetch(url, { method, body, headers });
			if (!response.ok) {
				const data = await response.json();
				console.log(data);
				return data;
				// throw new Error(`Could not fetch ${url}, status: ${response.status}`);
			}
			const data = await response.json();
			return data;
		} catch (e) {
			throw e;
		}
	};
	return { request };
};

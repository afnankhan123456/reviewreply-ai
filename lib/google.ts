export async function fetchGoogleBusinessLocations(accessToken: string) {

  const response = await fetch(
    "https://mybusinessbusinessinformation.googleapis.com/v1/accounts",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  return data;
}
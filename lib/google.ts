export async function fetchGoogleBusinessLocations(
  accessToken: string
) {

  const accountsResponse = await fetch(
    "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const accountsData = await accountsResponse.json();

  if (!accountsData.accounts?.length) {

    return {
      success: false,
      error: "No Google Business Profile Found",
    };
  }

  const accountName = accountsData.accounts[0].name;

  const locationsResponse = await fetch(
    `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const locationsData = await locationsResponse.json();

  return {
    success: true,
    locations: locationsData.locations || [],
  };
}

export async function fetchGoogleReviews(
  accessToken: string,
  locationName: string
) {

  const response = await fetch(
    `https://mybusiness.googleapis.com/v4/${locationName}/reviews`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  return {
    success: true,
    reviews: data.reviews || [],
  };
}

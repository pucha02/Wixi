export const fetchData = async () => {
  try {
    const respons = await fetch("http://localhost:3001/data").then((data) =>
      data.json()
    );
    return respons;
  } catch (error) {
    console.log(error);
  }
};

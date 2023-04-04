const fetchData = () => {
  fetch('https://norma.nomoreparties.space/api/ingredients')
    .then((response) => response.json())
    .then(({data}) => data)
    .catch((error) => console.error(error));
}

export default fetchData;
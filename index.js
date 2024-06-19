const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.get('/companies/:companyName/categories/:categoryName/products', async (req, res) => {
  const { companyName, categoryName } = req.params;
  const { top, minPrice, maxPrice, sort } = req.query;

  try {

    const products = await fetchProductsFromTestServer(companyName, categoryName, top, minPrice, maxPrice, sort);


    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


async function fetchProductsFromTestServer(companyName, categoryName, top, minPrice, maxPrice, sort) {
  try {
    const response = await axios.get(`http://20.244.56.144/test/companies/${companyName}/categories/${categoryName}/products`, {
      params: {
        top,
        minPrice,
        maxPrice,
        sort,
      },
    });

    return response.data; 
  } catch (error) {
    console.error('Error fetching products from test server:', error);
    throw error;
  }
}

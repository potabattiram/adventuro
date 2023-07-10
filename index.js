const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 202
}))
const SearchHandlers = require('./Controllers/AdventuroApp/SearchHandlers');
const OrdersHandlers = require('./Controllers/AdventuroApp/OrdersHandlers');
const VendorConfigurator = require('./Controllers/ChannelConfigurator/VendorConfig');


app.get('/', (req, res) => {
  res.send('Adventuro Backend is working well!');
});

app.use(SearchHandlers);
app.use(OrdersHandlers);
app.use(VendorConfigurator);

const port = 9000;
app.listen(port || process.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});

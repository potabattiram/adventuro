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
// const VendorConfigurator = require('./Controllers/ChannelConfigurator/VendorConfig');
const ChannelConfigs = require('./Controllers/ChannelConfigurator/NewChannelConfigApis');


app.get('/', (req, res) => {
  res.send('Adventuro Backend is working well!');
});

app.use(SearchHandlers);
app.use(OrdersHandlers);
// app.use(VendorConfigurator);
app.use(ChannelConfigs);


const port = 9000;
app.listen(port || process.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});

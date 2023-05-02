const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const apiEndpoint = 'http://localhost:26659/submit_pfb';

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Submit Transaction</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
      </head>
      <body class="bg-light">
        <div class="container my-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  <h2 class="mb-0">Submit Transaction</h2>
                </div>
                <div class="card-body">
                  <form action="/submit" method="post">
                    <div class="mb-3">
                      <label for="namespace_id" class="form-label">Namespace ID:</label>
                      <input type="text" id="namespace_id" name="namespace_id" class="form-control" required>
                    </div>
                    <div class="mb-3">
                      <label for="data" class="form-label">Data:</label>
                      <input type="text" id="data" name="data" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `);
});

app.post('/submit', async (req, res) => {
  const namespaceId = req.body.namespace_id;
  const data = req.body.data;

  try {
    const response = await axios.post(apiEndpoint, {
      namespace_id: namespaceId,
      data: data,
      gas_limit: 80000,
      fee: 2000,
    });

    res.send(`Transaction submitted successfully! Response: ${JSON.stringify(response.data)}`);
  } catch (error) {
    res.send(`Error: ${error.response.status} ${error.response.statusText}`);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

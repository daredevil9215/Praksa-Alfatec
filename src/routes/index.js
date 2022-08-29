const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
var seed_path = './seed.json';

const router = express.Router();
const Souvenir = mongoose.model('Souvenir');


/* Show souvenir input form */
router.get('/input', (req, res) => {
    res.render('input', { title: 'Add a souvenir',
                          h1: 'Add a souvenir', });
});


/* Show souvenir table */
router.get('/table', (req, res) => {
  
  Souvenir.find()
  .then((suveniri) => {
    res.render('table', { title: 'Souvenir inventory', suveniri,
                            h1: 'Souvenir inventory',
                            page: 'table' });
  })
  .catch(() => { res.send('Sorry! Something went wrong.'); })
});


/* Show souvenir list */
router.get('/', (req, res) => {

  Souvenir.find().then((suveniri) => {
    if(suveniri.length == 0) {
      var data = fs.readFileSync(seed_path, 'utf-8');
      var json = JSON.parse(data);
      Souvenir.insertMany(json, () => {});
    }
  }).then(Souvenir.find()
  .then((suveniri) => {
    res.render('list', { title: 'Souvenir inventory', suveniri,
                            h1: 'Souvenir inventory',
                            page: 'list' });
  })
  .catch(() => { res.send('Sorry! Something went wrong.'); }));
  
});


/* Add souvenir to database */
router.post('/add', (req, res) => {

    var suvenir = new Souvenir(req.body);
    var err = suvenir.validateSync();

    if(err) {
      var errorArray = {};

      Object.keys(err.errors).forEach((key) => {
        errorArray[key] = err.errors[key].message;
      });

      res.render('input', {
        title: 'Add a souvenir',
        h1: 'Add a souvenir',
        errors: errorArray,
        data: req.body,
      });
    }

    else {

      suvenir.save().then(() => {Souvenir.find()
        .then((suveniri) => {
          res.render('list', { title: 'Souvenir inventory', suveniri,
                                  h1: 'Souvenir inventory',
                                  page: 'list' });
        })
        .catch(() => { res.send('Sorry! Something went wrong.'); })});
      

    };

});


/* Delete souvenir from database (table view) */
router.post('/delete', (req, res) => {
    Souvenir.deleteOne({ '_id':req.body._id })
    .then(() => {Souvenir.find()
      .then((suveniri) => {
        res.render('table', { title: 'Souvenir inventory', suveniri,
                                h1: 'Souvenir inventory',
                                page: 'table' });
      })
      .catch(() => { res.send('Sorry! Something went wrong.'); })});
})


/* Delete souvenir from database (list view) */
router.post('/delete_2', (req, res) => {
  Souvenir.deleteOne({ '_id':req.body._id })
  .then(() => {Souvenir.find()
    .then((suveniri) => {
      res.render('list', { title: 'Souvenir inventory', suveniri,
                              h1: 'Souvenir inventory',
                              page: 'list' });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); })});
})


/* Show souvenir modification form */
router.post('/alter', (req, res) => {
  Souvenir.findOne({ '_id': req.body._id })
  .then((suvenir) => {
    res.render('input', { title: 'Modify a souvenir', suvenir,
                              h1: 'Modify a souvenir' });
  })
  .catch(() => { res.send('Sorry! Something went wrong.'); })
});


/* Modifiy souvenir */
router.post('/alter_2', (req, res) => {
  
  var suvenir = new Souvenir(req.body);
  var err = suvenir.validateSync();

  if (err) {

    var errorArray = {};

    Object.keys(err.errors).forEach((key) => {
      errorArray[key] = err.errors[key].message;
    });

    res.render('input', {
      title: 'Modify a souvenir',
      suvenir,
      h1: 'Modify a souvenir',
      errors: errorArray,
      data: req.body,
    });
  }

  else {
    Souvenir.updateOne({ '_id': req.body._id}, req.body)
    .then(() => {
      Souvenir.find()
            .then((suveniri) => {
              res.render('list', { title: 'Souvenir inventory', suveniri,
                                    h1: 'Souvenir inventory',
                                    page: 'list' });
            })
            .catch(() => { res.send('Sorry! Something went wrong.'); }) });
  }

});


/* Sort by name asc */
router.get('/table/sort_name_asc', (req, res) => {
  
  Souvenir.find().sort({name: 1})
  .then((suveniri) => {
    res.render('table', { title: 'Souvenir inventory', suveniri,
                            h1: 'Souvenir inventory',
                            page: 'table' });
  })
  .catch(() => { res.send('Sorry! Something went wrong.'); })
});


/* Sort by name desc */
router.get('/table/sort_name_desc', (req, res) => {
  
  Souvenir.find().sort({name: -1})
  .then((suveniri) => {
    res.render('table', { title: 'Souvenir inventory', suveniri,
                            h1: 'Souvenir inventory',
                            page: 'table' });
  })
  .catch(() => { res.send('Sorry! Something went wrong.'); })
});


/* Sort by price asc */
router.get('/table/sort_price_asc', (req, res) => {
  
  Souvenir.find().sort({price: 1})
  .then((suveniri) => {
    res.render('table', { title: 'Souvenir inventory', suveniri,
                            h1: 'Souvenir inventory',
                            page: 'table' });
  })
  .catch(() => { res.send('Sorry! Something went wrong.'); })
});


/* Sort by price desc */
router.get('/table/sort_price_desc', (req, res) => {
  
  Souvenir.find().sort({name: -1})
  .then((suveniri) => {
    res.render('table', { title: 'Souvenir inventory', suveniri,
                            h1: 'Souvenir inventory',
                            page: 'table' });
  })
  .catch(() => { res.send('Sorry! Something went wrong.'); })
});


/* Sort by quantity asc */
router.get('/table/sort_quantity_asc', (req, res) => {
  
  Souvenir.find().sort({quantity: 1})
  .then((suveniri) => {
    res.render('table', { title: 'Souvenir inventory', suveniri,
                            h1: 'Souvenir inventory',
                            page: 'table' });
  })
  .catch(() => { res.send('Sorry! Something went wrong.'); })
});


/* Sort by quantity desc */
router.get('/table/sort_quantity_desc', (req, res) => {
  
  Souvenir.find().sort({quantity: -1})
  .then((suveniri) => {
    res.render('table', { title: 'Souvenir inventory', suveniri,
                            h1: 'Souvenir inventory',
                            page: 'table' });
  })
  .catch(() => { res.send('Sorry! Something went wrong.'); })
});


/* Sort by color asc */
router.get('/table/sort_color_asc', (req, res) => {
  
  Souvenir.find().sort({color: 1})
  .then((suveniri) => {
    res.render('table', { title: 'Souvenir inventory', suveniri,
                            h1: 'Souvenir inventory',
                            page: 'table' });
  })
  .catch(() => { res.send('Sorry! Something went wrong.'); })
});


/* Sort by color desc */
router.get('/table/sort_color_desc', (req, res) => {
  
  Souvenir.find().sort({color: -1})
  .then((suveniri) => {
    res.render('table', { title: 'Souvenir inventory', suveniri,
                            h1: 'Souvenir inventory',
                            page: 'table' });
  })
  .catch(() => { res.send('Sorry! Something went wrong.'); })
});


/* Filter table */
router.post('/filter_table', (req, res) => {

  var number = parseFloat(req.body.search);

  if(req.body.field == 'price' || req.body.field == 'quantity') {
    Souvenir.find({ [req.body.field]: number })
    .then((suveniri) => {
      res.render('table', { title: 'Souvenir inventory', suveniri,
                                h1: 'Souvenir inventory',
                                page: 'table' });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); })
  }


  else {
    Souvenir.find({ [req.body.field]: { $regex: req.body.search, $options: "i" } })
    .then((suveniri) => {
      res.render('table', { title: 'Souvenir inventory', suveniri,
                                h1: 'Souvenir inventory',
                                page: 'table' });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); })
  }

});


/* Filter list */
router.post('/filter_list', (req, res) => {

  var number = parseFloat(req.body.search);

  if(req.body.field == 'price' || req.body.field == 'quantity') {
    Souvenir.find({ [req.body.field]: number })
    .then((suveniri) => {
      res.render('list', { title: 'Souvenir inventory', suveniri,
                                h1: 'Souvenir inventory',
                                page: 'list' });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); })
  }


  else {
    Souvenir.find({ [req.body.field]: { $regex: req.body.search, $options: "i" } })
    .then((suveniri) => {
      res.render('list', { title: 'Souvenir inventory', suveniri,
                                h1: 'Souvenir inventory',
                                page: 'list' });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); })
  }
  
});


module.exports = router;
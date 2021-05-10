const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
Tag.findAll({
  include: {
    model: Product,
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
  }
})
.then(dbCatchData => {
  if(!dbCatchData){
    res.status(404).json({message: 'Nothing found here'});
    return;
  }
res.json(dbCatchData);
})
.catch(err => {
console.log(err);
res.status(500).json(err)
});
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
Tag.findOne({
  where: {
    id: req.params.id
  },
  include: {
    model: Product,
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
  }
})
.then(dbCatchData => {
  if(!dbCatchData){
    res.status(400).json({message: 'Nothing found here as well'});
    return;
  }
  res.json(dbCatchData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err)
});
});

router.post('/', (req, res) => {
  // create a new tag
Tag.create({
  category_name: req.body.category_name

})
.then(dbCatchData => res.json(dbCatchData))
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
Tag.update(req.body, {
  where: {
    id: req.params.id
 
  }
})
.then(dbCatchData => {
  if(!dbCatchData){
    res.status(400).json({message: 'Nothing here sorry '});
    return;
  }
  res.json(dbCatchData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
Category.destroy({
  where: {
    id: req.params.id
  }
})
.then(dbCatchData => {
  if(!dbCatchData){
    res.status(400).json({message: 'Nothing here try again'});
  return;
  }
  res.json(dbCatchData);
})
.catch(err => {
  console.log(err);
  res.status(500).json(err)
});
});

module.exports = router;

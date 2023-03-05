const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
 
  try {
    const tData = await Tag.findAll(
      {include: [{model: Product, 
        through: ProductTag}]}
    );
    res.status(200).json(tData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {

  try {
    const tData = await Tag.findByPk(req.params.id,
      {include: [{model: Product, 
        through: ProductTag}]}
    );
    res.status(200).json(tData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  
  try {
    const tData = await Tag.create(req.body);
    res.status(200).json(tData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  
  try {
    const tData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(tData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {

  try {
    const tData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tData) {
      res.status(404).json({ message: 'Tag not found with this id!' });
      return;
    }
    res.status(200).json(tData);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;

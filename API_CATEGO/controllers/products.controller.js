const Products = require('../models/Products');


exports.create =  async(req, res) =>{
  var dados = req.body;
  await Products.create(dados)
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: 'Produto inserido com sucesso!'
    });
  }).catch((err)=>{
    return res.status(400).json({
      erro:true,
      mensagem: `Erro: Produto não encontrado... ${err}`
    })
  })
}


exports.findAll = async(req,res)=>{
  await Products.findAll({
    attributes: ['id','name','description','quantity','price','categorieId'],
    order: [['id', 'ASC']]
   
  })
  .then((products) => {
    return res.json({
      erro: false,
      products
    });
  }).catch((err) => {
    return res.status(400).json({
      erro : true,
      mensagem: `Erro ${err} ou nenhum produto encontrado`
    })
  })
}


exports.update = async(req,res)=>{
  const {id} = req.body;

  await Products.update(req.body, {where: {id}})
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: "Produto alterada com sucesso!"
    })
  }).catch((err)=>{
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: Produtos não encontrado ...${err}`
    })
  })
}


exports.findOne = async (req, res) =>{
  const {id} = req.params;
  try{
    const products = await Products.findByPk(id);
    if(!products){
      return res.status(400).json({
        erro: true,
        mensagem: "Erro:Nenhum Produto encontrado!"
      })
    }
    res.status(200).json({
      erro: false,
      products
    })
  }catch(err){
    res.status(400).json({
      erro: true,
      mensagem: `Erro ${err}`
    })
  }
}


exports.delete =  async(req,res)=>{
  const {id} = req.params;
  await Products.destroy({where: {id}})
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: "Produto apagada com sucesso!"
    });
  }).catch((err)=>{
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: ${err} Produto não apagado...`
    })
  })
}



exports.findAllPages = async(req,res)=>{
  const {page = 1, reg = 2} = req.query
  console.log(page,reg)
  const limit = Number(reg)
  let lastPage = 1

  const countProducts = await Products.count()
  if(countProducts === null){
    return res.status(400).json({
      erro : true,
      mensagem: "Error: Produtos não encontrado"
    })
  }
  else{
    lastPage = Math.ceil((countProducts / limit))
  }
  await Products.findAll({
    attributes: ['id','name','description','quantity','price'],
    order: [['name', 'ASC']],
    offset: Number((page * limit) - limit),
    limit : limit
  })
  .then((products) => {
    return res.json({
      erro: false,
      products,
      countProducts,
      lastPage
    });
  }).catch((err) => {
    return res.status(400).json({
      erro : true,
      mensagem: `Erro ${err} ou nenhum produto encontrado!!!`
    })
  })
}











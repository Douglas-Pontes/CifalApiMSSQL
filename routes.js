const router = require("express").Router()
const sql = require("mssql")

router.get('/produtos', (req, res) => {
    const rq = new sql.Request()
    rq.query('select CodProduto, Desceq, Unideq, Estoque, PerVista, CodEan14 from Produtos ', (err, result) => {
        res.json(result.recordsets[0] || "")
    })
})

router.get('/remessas/:NumeroRemessa', (req, res) => {
    const rq = new sql.Request()

    rq.input("NumeroRemessa", sql.VarChar, req.params.NumeroRemessa)
    rq.query('select * from tcRemessas where NumeroRemessa = @NumeroRemessa', (err, result) => {
        res.json(result.recordsets[0] || "")
    })
})

router.get('/vendedores', (req, res) => {
    const rq = new sql.Request()
    rq.query('select * from tcVendedor ', (err, result) => {
        res.json(result.recordsets[0] || "")
    })
})

// router.get('/add/:num1/:num2', (req, res) => {
//     try {
//         var rq = new sql.Request();

//         console.log(req.params)

//         rq.input("Number1", sql.Int, parseInt(req.params.num1));
//         rq.input("Number2", sql.Int, parseInt(req.params.num2));

//         rq.execute("dbo.AddNumbers").then(dataset => {
//             if (dataset && dataset.recordsets && dataset.recordsets.length) {
//                 res.json(dataset.recordset[0])
//                 console.log(dataset.recordset[0])
//             } else {
//                 res.json({ Error: "Something went wrong" })
//             }
//         }).catch(err => {
//             res.json(err)
//         })
//     } catch (e) {
//         res.json(e)
//     }
// })

// router.get('/vendas', (req, res) => {

//     try {
//         var rq = new sql.Request();

//         rq.input("Ano", sql.Int, parseInt(req.body.Ano));
//         rq.input("Mes", sql.Int, parseInt(req.body.Mes));
//         rq.input("CodSupervisor", sql.Int, parseInt(req.body.CodSupervisor));

//         rq.execute("spVenRealSup").then(dataset => {
//             if (dataset && dataset.recordsets && dataset.recordsets.length) {
//                 res.json(dataset.recordset[0])
//             } else {
//                 res.json({ Error: "Something went wrong" })
//             }
//         }).catch(err => {
//             res.json(err)
//         })
//     } catch (e) {
//         res.json(e)
//     }
// })

// router.get('/funcionario', (req, res) => {

//     try {
//         var rq = new sql.Request();

//         rq.input("CodUsuario", sql.Int, parseInt(req.body.CodUsuario));
//         rq.input("Operacao", sql.Int, parseInt(req.body.Operacao));
//         rq.input("CodFun", sql.Int, parseInt(req.body.CodFun));
//         rq.input("Senha", sql.VarChar, req.body.Senha);

//         rq.execute("spManterSenhaFun").then(dataset => {
//             res.json({ Msg: "Successfully added" })
//         }).catch(err => {
//             res.json(err)
//         })
//     } catch (e) {
//         res.json(e)
//     }

// })


module.exports = router;
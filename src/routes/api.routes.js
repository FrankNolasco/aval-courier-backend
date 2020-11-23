const { Router } = require("express");
const  { login, ListaOrdenServicio, ListaColaborador, ListaUsuarios, ListaPuestoTrabajo, ListaMensajero, ListaIncidencias, ListaPersonas, ListaCiudad, ListaProvincias, ListaDistritos, ListaDepartamentos } = require('../controllers/api.controllers')
const routes = Router();

routes.post('/log-in',login)
routes.post('/ordenes-de-servicio/listar',ListaOrdenServicio)
routes.post('/colaboradores/listar',ListaColaborador)
routes.post('/usuarios/listar',ListaUsuarios)
routes.post('/puestos-de-trabajo/listar',ListaPuestoTrabajo)
routes.post('/mensajeros/listar',ListaMensajero)
routes.post('/incidencias/listar',ListaIncidencias)
routes.post('/personas/listar',ListaPersonas)
routes.post('/ciudad/listar',ListaCiudad)
routes.post('/provincias/listar',ListaProvincias)
routes.post('/distritos/listar',ListaDistritos)
routes.post('/departamentos/listar',ListaDepartamentos)

module.exports = routes;
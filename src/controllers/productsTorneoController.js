const fs = require('fs');
const path = require('path');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// Base de datos 
const db = require('../database/models');

// Modelo
const UserOwner = db.UserOwner;
const TelefonoOwner = db.TelefonoOwner;
const MedioDePago = db.MedioDePago;
const LogoOwner = db.LogoOwner;
const ImagenOwner = db.ImagenOwner;
const DetalleLugarOwner = db.DetalleLugarOwner;
const Cancha = db.Cancha;
const Ubicacion = db.Ubicacion
const ImagenCancha = db.ImagenCancha
const TipoCh = db.TipoDeCancha;
const Deportes = db.Deporte
const Genero = db.Genero
const HoraOwner = db.HoraPlayer;
const DiaOwner = db.DiaPlayer;
const Escuelita = db.Escuelita;
const DiaYhora = db.DiaHorarioTorneo;
const Profesor = db.Profesor
const Torneo = db.Torneo


const controller = {


	// Detail - Detail from one product
	detalle: (req, res) => {

		let id = req.params.id
		let product = products.find(product => product.id == id)

		res.render("detalle", {
			product
		})

	},

	// Create - Form to create
	create: (req, res) => {

		let ownerID = req.params.id
		let deportes = Deportes.findAll()
		let genero = Genero.findAll()
		let dias = DiaOwner.findAll()
		let horarios = HoraOwner.findAll()

		Promise
			.all([deportes, genero, dias, horarios])
			.then(([deportes, genero, dias, horarios]) => {

				res.render("partial/userOwner/crearTorneo", {
					deportes,
					genero,
					dias,
					horarios
				})
			})

		

	},

	// Create -  Method to store
	store: (req, res) => {

		let image;
		if (req.files[0] != undefined) {
			image = req.files[0].filename;
		} else {
			image = "png-clipart-trophy-medal-organization-competition-mobile-app-development-copa-del-rey-child-company.png";
		}
		let ownerID = req.params.id
		
		Torneo
			.create({
				cantidad_equipos: req.body.cantidadEquipos,
				categoria: req.body.categoria,
				valor: req.body.valor,
				premio: req.body.premio,
				fecha_inicio: req.body.fechaInicio,
				fecha_fin: req.body.fechaFin,
				deportes_players_id: req.body.deporte,
				genero_id: req.body.genero,
				users_owners_id: ownerID,
				img_t: image
		
			}).then((result) => {
				let torneoID = result.id
				DiaYhora.create({
					torneos_id: torneoID,
					dias_id: req.body.dia,
					horas_id: req.body.hora
				})
			}).then(() => {
				return res.redirect("/userOwner/update")
			})
		

	},

	// Update - Form to edit
	edit: (req, res) => {

		let torneosID = req.params.id
		let torneos = Torneo.findByPk(torneosID, {
			include: ['deporteT', 'genero', 'diahora'],
		})
		let deportes = Deportes.findAll();
		let genero = Genero.findAll();
		let dias = DiaOwner.findAll();
		let horarios = HoraOwner.findAll();

		Promise
			.all([torneos, deportes, genero, dias, horarios])
			.then(([torneos, deportes, genero, dias, horarios]) => {
				res.render("partial/userOwner/editarTorneo", {
					torneos,
					deportes,
					genero,
					dias,
					horarios
				})
			})
      
      
	},
	// Update - Method to update
	update: (req, res) => {

		let torneosID = req.params.id

		let image
		if (req.files[0] != undefined) {
			image = req.files[0].filename
		} else {
			image = torneosID.image
		}
		Torneo.update({
			cantidad_equipos: req.body.cantidadEquipos,
				categoria: req.body.categoria,
				valor: req.body.valor,
				premio: req.body.premio,
				fecha_inicio: req.body.fechaInicio,
				fecha_fin: req.body.fechaFin,
				deportes_players_id: req.body.deporte,
				genero_id: req.body.genero,
				img_t: image
		}, {
			where: {
				id: req.params.id
			}
		})
		DiaYhora.update({
			dias_id: req.body.dia,
			horas_id: req.body.hora
		}, {
			where: {
				id: req.params.id
			}
		}).then(() => {
			return res.redirect("/userOwner/update")
		})


	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		let torneosID = req.params.id

		Torneo.destroy({
			where: { id: torneosID },
			force: true
		}).then(() => {
			return res.redirect("/userOwner/update")
		})

	}
};

module.exports = controller;
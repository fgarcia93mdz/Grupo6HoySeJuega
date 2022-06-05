const fs = require('fs');
const path = require('path');
const ownersFilePath = path.join(__dirname, '../database/userOwnerDataBase.json');
const playersFilePath = path.join(__dirname, '../database/userPlayerDataBase.json');
const owners = JSON.parse(fs.readFileSync(ownersFilePath, 'utf-8'));
const player = JSON.parse(fs.readFileSync(playersFilePath, 'utf-8'));


const registerController = {

  formularioDatosCancha: (req, res) => {

    res.render("partial/register/formularioDatosCancha")
  },

  formularioDatosJugador: (req, res) => {

    res.render("partial/register/formularioDatosJugador")
  },

  register: (req, res) => {

    res.render("partial/register/register")
  },

  editOwnerForm: (req, res) => {
    let id = req.params.id
    let userOwner = owners.find(userOwner => userOwner.id == id)

    res.render('partial/register/editOwnerForm', {
      userOwner
    })
  },

  update: (req, res) => {

		let id = req.params.id
		let ownerToEdit = owners.find(owner => owner.id == id)

		let image
		if (req.files[0] != undefined) {
			image = req.files[0].filename
		} else {
			image = ownerToEdit.image
		}

		ownerToEdit = {
			id: ownerToEdit.id,
			...req.body,
			image: image,
		}

		let newowner = owners.map(owner => {

			if (owner.id == ownerToEdit.id) {

				return owner = {
					...ownerToEdit
				};
			}

			return owner
		})

		fs.writeFileSync(ownersFilePath, JSON.stringify(newowner));

		res.redirect('../userOwner/vistaCancha' + ownerToEdit.id)
	},


  editPlayerForm: (req, res) => {
    let id = req.params.id
    let userPlayer = player.find(userPlayer => userPlayer.id == id)
    res.render('partial/register/editPlayerForm', {
    userPlayer
    })
  }

}
module.exports = registerController
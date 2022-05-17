import noteService from '../services/noteService'
let createNote = async(req, res) => {
    try {
        let infor = await noteService.createNote(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}
let getAllNote = async(req, res) => {
    try {
        let infor = await noteService.getAllNote();
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}
let getDetailNoteById = async(req, res) => {
    try {
        let infor = await noteService.getDetailNoteById(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}
module.exports = {
    createNote: createNote,
    getAllNote: getAllNote,
    getDetailNoteById: getDetailNoteById,
}
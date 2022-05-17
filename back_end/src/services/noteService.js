const db = require('../models');
let createNote = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 ||
                !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errorMessage: 'Missing parameter'
                })
            } else {
                await db.Note.create({
                    name: data.name,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    image: data.imageBase64,
                })
                resolve({
                    errCode: 0,
                    errorMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllNote = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.Note.findAll();
            if (data && data.length > 0) {
                data.map((item) => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errCode: 0,
                errorMessage: 'OK',
                data
            })
        } catch (e) {
            reject(e);
        }
    })
}
let getDetailNoteById = (inputId) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errorMessage: 'Missing parameter'
                })
            } else {
                let data = await db.Note.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'descriptionHTML', 'descriptionMarkdown']
                })
                if (data) {
                    let doctorNote = [];
                    doctorNote = await db.Doctor_Infor.findAll({
                        where: { clinicId: inputId },
                        attributes: ['doctorId', 'provinceId']
                    })
                    data.doctorNote = doctorNote
                } else data = {}
                resolve({
                    errCode: 0,
                    errorMessage: 'OK',
                    data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNote: createNote,
    getAllNote: getAllNote,
    getDetailNoteById: getDetailNoteById,
}
/**
 * Created by Afro on 10/10/2017.
 */
const fs = require('fs');

const $file = {
    read: function (model) {
        try {
            const data = JSON.parse(fs.readFileSync('./jsonLit.json'));
            return !!model ? data[model] : data;
        }
        catch (err) {
            return []
        }
    },
    write: function (data, model, command) {
        let file = this.read();
        if (file && data) {
            if (command === 'change') {
                let strData = JSON.stringify(data, null, 2);
                fs.writeFileSync('./jsonLit.json', strData);
                return true
            }
            else {
                file[model].push(data);
                let strData = JSON.stringify(file, null, 2);
                fs.writeFileSync('./jsonLit.json', strData);
                return true
            }
        }
        return false
    },

    update: function (id, data, model) {
        id = parseInt(id);
        let items = this.read();
        if (items && data && id) {
            let contentId = items.findIndex(item => parseInt(item.id) === id);
            items[model][contentId] = data;
            let done = this.write(data, model, 'change');
            return !!done
        }
        return false
    },
    delete: function (noteId, model) {
        let notes = this.read();
        noteId = parseInt(noteId);
        if (notes) {
            let note = notes[model].findIndex(item => {
                return parseInt(item.id) === noteId
            });
            notes[model].splice(parseInt(note), 1);
            let done = this.write(notes, model, 'change');
            return !!done;
        }
        return false

    }
};
module.exports = $file;
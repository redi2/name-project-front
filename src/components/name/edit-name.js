import React, { Fragment, useState } from 'react';

const EditName = ({currentName}) => {
    const [name, setName] = useState(currentName.name);
    const [gender, setGender] = useState(currentName.gender == null ? "" : currentName.gender);
    const [origin_language, setOriginLanguage] = useState(currentName.origin_language);

    const resetInput = e => {
        setName(currentName.name);
        setGender(currentName.gender);
        setOriginLanguage(currentName.origin_language);
    }
    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const body = {name, gender,origin_language};
            console.log(body);
            const updateName = await fetch(`${process.env.REACT_APP_BACK_SERVER}${process.env.REACT_APP_NAME_API}/${currentName.name_id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });

            window.location = '/';
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        
        <Fragment>

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${currentName.name_id}`}>
                Edit
            </button>


            <div className="modal fade" id={`id${currentName.name_id}`} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Name</h5>
                            <button type="button" onClick={e => resetInput(e)} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <div className="form-group">
                    <label htmlFor="id">Name</label>
                    <input type="text" value={name} 
                    onChange={ e=> {setName(e.target.value)}} className="form-control" id="name" placeholder="Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="origin_language">Origin Language</label>
                    <select value={origin_language} 
                    onChange={e=> setOriginLanguage(e.target.value)} className="form-control" id="origin_language">
                        <option>Select Origin</option>
                        <option value="1">Afar</option>
                        <option value="2">Amharic</option>
                        <option value="3">Oromiffa</option>
                        <option value="4">Tirignya</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <input value={gender} 
                    onChange={e=> setGender(e.target.value)} type="text" className="form-control" id="gender" placeholder="Gender" />
                </div>
                                
      </div>
                        <div className="modal-footer">
                            <button onClick={e => resetInput()} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={e => handleEdit(e)}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditName;